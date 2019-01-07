<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>


        <GridLayout columns="*" rows="*">
            <StackLayout col="0" row="0">
                <MapView
                        :latitude="latitude"
                        :longitude="longitude"
                        :zoom="zoom"
                        :bearing="bearing"
                        :tilt="tilt"
                        :padding="padding"
                        :minZoom="minZoom"
                        :maxZoom="maxZoom"
                        @mapReady="mapReady"
                        @markerSelect="onMarkerSelect" />
            </StackLayout>

            <DockLayout stretchLastChild="false">
                <DockLayout dock="bottom">
                    <Button :isEnabled="isGMaps" class="btn-primary p-20 " @tap="openGmaps" text="Open GMaps"/>

                </DockLayout>
            </DockLayout>
        </GridLayout>

    </Page>
</template>

<script>
    import Login from "./Login"
    const geolocation = require("nativescript-geolocation");
    const { Accuracy } = require("tns-core-modules/ui/enums");
    import { Position, Marker } from "nativescript-google-maps-sdk";

    // require the plugin
    import { Directions } from "nativescript-directions";

    // instantiate the plugin
    var directions = new Directions();


    export default {
        data() {
            return {
                msg: 'Hello World!',
                lat: '',
                lng: '',
                latitude: -1.28333,
                longitude: 36.81667,
                zoom: 15,
                minZoom: 0,
                maxZoom: 22,
                bearing: 0,
                tilt: 0,
                padding: [40, 40, 40, 40],
                mapView: null,
                isGMaps: false,
            }
        },

        created(){
            directions.available().then(avail => this.isGMaps = avail);
        },

        methods:{
            mapReady(args) {
                this.mapView = args.object
                this.mapView.infoWindowTemplate = `
				<StackLayout orientation="vertical" width="200">
					<Label text="{{title}}" className="title"/>
					<Label text="{{snippet}}" textWrep="true" class="snippet"/>
				</StackLayout>
			`
                const marker = new Marker()
                marker.position = Position.positionFromLatLng(0, 0)
                marker.title = 'Test'
                marker.snippet = 'test'
                marker.userData = {test: 'test'}
                this.mapView.addMarker(marker)
            },
            onMarkerSelect(args) {
                console.log(args.marker)
            },

            openGmaps(){
                directions.navigate({
                    to: [{ // if an Array is passed (as in this example), the last item is the destination, the addresses in between are 'waypoints'.
                        lat: -1.28333,
                        lng: 36.81667
                    }],
                    type: "walking", // optional, can be: driving, transit, bicycling or walking
                    ios: {
                        preferGoogleMaps: true, // If the Google Maps app is installed, use that one instead of Apple Maps, because it supports waypoints. Default true.
                        allowGoogleMapsWeb: true // If waypoints are passed in and Google Maps is not installed, you can either open Apple Maps and the first waypoint is used as the to-address (the rest is ignored), or you can open Google Maps on web so all waypoints are shown (set this property to true). Default false.
                    }
                }).then(() => {
                    console.log("Maps app launched.");
                }, error => {
                    console.log(error);
                });
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
