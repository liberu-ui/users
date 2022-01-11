<template>
    <figure class="image avatar">
        <img class="is-rounded"
            :src="link">
    </figure>
</template>

<script>

export default {
    name: 'Avatar',

    inject: ['route'],

    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    computed: {
        link() {
            return this.route('core.avatars.show', this.user.avatar.id);
        },
        tooltip() {
            return this.user.person?.appellative
                ?? this.user.person?.name;
        },
    },
};
</script>

<style lang="scss">
    .avatar {
        margin: auto;
    }
</style>
