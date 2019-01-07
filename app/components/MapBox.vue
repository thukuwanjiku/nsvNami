<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>


        <GridLayout columns="*" rows="*">
            <StackLayout col="0" row="0">

                <Mapbox
                        accessToken="pk.eyJ1IjoidGh1a3V3YW5qaWt1IiwiYSI6ImNqcGZoNXM1azA4YnozcHA4M2VheTM5dm0ifQ.QbINKRaXB2R6wBiCxQ_eRQ"
                        mapStyle="traffic_day"
                        :latitude="-1.28333"
                        :longitude="36.81667"
                        :hideCompass="true"
                        :zoomLevel="12"
                        :showUserLocation="false"
                        :disableZoom="false"
                        :disableRotation="false"
                        :disableScroll="false"
                        :disableTilt="false"
                        @mapReady="mapReady"
                        >
                </Mapbox>

            </StackLayout>

            <DockLayout stretchLastChild="false">
                <DockLayout dock="bottom">
                    <Button class="btn-primary p-20 " @tap="animateToPickup" text="Animate Camera"/>

                </DockLayout>
            </DockLayout>

        </GridLayout>

    </Page>
</template>

<script>

    export default {
        data() {
            return {
                mapbox: null,
            }
        },

        created(){
            setTimeout(()  =>{
                this.mapboxRoute();
            }, 5000);
            /*setTimeout(()=>{
                this.mapboxRoute();
            }, 5000);*/

            /*setTimeout(()=>{
                this.mapbox.getUserLocation().then(
                    function(userLocation) {
                        alert("Latitude: "+ userLocation.location.lat +'\nLongitude: '+userLocation.location.lng
                        + '\nSpeed: '+ userLocation.speed);
                        /!*console.log("Current user location: " +  userLocation.location.lat + ", " + userLocation.location.lng);
                        console.log("Current user speed: " +  userLocation.speed);*!/
                    }
                )
            }, 10000)*/
        },

        methods:{
            mapReady(args) {
                this.mapbox = args.object

                this.mapbox.hasFineLocationPermission().then(
                    function(granted) {
                        if(!granted){
                            this.mapbox.requestFineLocationPermission()
                                .then(() =>{
                                    console.log("Requested Permission");
                                });
                        }
                        // if this is 'false' you probably want to call 'requestFineLocationPermission' now
                        console.log("Has Location Permission? " + granted);
                    });
            },

            mapboxRoute(){
                this.mapbox.addPolyline({
                    id: 1, // optional, can be used in 'removePolylines'
                    color: '#336699', // Set the color of the line (default black)
                    width: 7, // Set the width of the line (default 5)
                    opacity: 0.6, //Transparency / alpha, ranging 0-1. Default fully opaque (1).
                    points: [
                        {
                            'lat': -1.28333, // mandatory
                            'lng': 36.81667 // mandatory
                        },
                        {
                            'lat': -1.30333,
                            'lng': 36.82667
                        },
                        {
                            'lat': -1.32333,
                            'lng': 36.85667
                        }
                    ]
                });
            },

            animateToPickup(){
                this.mapbox.animateCamera({
                    // this is where we animate to
                    target: {
                        lat: -1.28333,
                        lng: 36.81667
                    },
                    zoomLevel: 17, // Android
                    altitude: 2000, // iOS (meters from the ground)
                    bearing: 270, // Where the camera is pointing, 0-360 (degrees)
                    tilt: 50,
                    duration: 5000 // default 10000 (milliseconds)
                })
            }
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
