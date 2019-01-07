<template>
    <Page :actionBarHidden="true">
        <FlexboxLayout backgroundColor="lightgreen" alignContent="center" alignItems="center" justifyContent="center">
            <StackLayout>
                <Button text="Go Login" class="btn-primary p-20" @tap="$navigateTo(routes.login)"/>
                <Button text="Google Maps SDK" class="btn-primary p-20" @tap="$navigateTo(routes.gmaps)"/>
                <Button text="Mapbox" class="btn-primary p-20" @tap="$navigateTo(routes.mapbox)"/>
            </StackLayout>
        </FlexboxLayout>

    </Page>
</template>

<script>
    import Login from "./Login"
    import GMaps from "./App"
    import MapBox from "./MapBox"

    export default {
        data() {
            return {
                routes: {
                    login: Login,
                    gmaps: GMaps,
                    mapbox: MapBox,
                }
            }
        },

        methods:{
            goLogin(){
                this.$navigateTo(Login, {backstackVisible: false});
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
