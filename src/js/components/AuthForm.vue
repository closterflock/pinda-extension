<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <form class="auth-form" v-on:submit.prevent="onSubmit">
        <h2>
            Sign {{isRegistration ? 'Up' : 'In'}}
        </h2>
        <label>
            Email Address
            <input type="text" name="email" v-model="email" lazy/>
        </label>
        <label>
            Password
            <input type="password" name="password" v-model="password" lazy/>
        </label>
        <label>
            New here? Sign up
            <input type="checkbox" v-model="isRegistration"/>
        </label>
        <div class="register-inputs" v-show="isRegistration">
            <label>
                Confirm Password
                <input type="password" name="confirm" v-model="confirm" lazy/>
            </label>
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script>
    export default {
        data: function () {
            return {
                isRegistration: false
            }
        },
        props: [
            'onLogin'
        ],
        methods: {
            onSubmit: function (e) {
                console.log('submitted');
                this.onLogin('12345');
            }
        }
    }
</script>