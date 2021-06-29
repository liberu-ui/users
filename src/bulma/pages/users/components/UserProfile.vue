<template>
    <div class="box has-background-light p-2 raises-on-hover"
        v-if="profile">
        <h4 class="title is-4 has-text-centered mt-3">
            <span class="icon">
                <fa icon="user"
                    size="xs"/>
            </span>
            {{ profile.person.name }}
            <span v-if="profile.person.appellative">
                ({{ profile.person.appellative }})
            </span>
        </h4>
        <divider class="mb-2"/>
        <div class="columns mt-3">
            <div class="column">
                <div class="columns is-mobile">
                    <div class="column">
                        <figure class="image is-128x128 avatar">
                            <img class="is-rounded"
                                :src="route('core.avatars.show', avatarId)">
                        </figure>
                    </div>
                    <div class="column">
                        <div class="mt-1 field controls">
                            <a class="button is-fullwidth is-primary"
                                v-if="isSelfVisiting"
                                @click="updateAvatar">
                                <span class="icon">
                                    <fa icon="sync-alt"/>
                                </span>
                                <span>
                                    {{ i18n('Avatar') }}
                                </span>
                            </a>
                            <uploader @upload-successful="setUserAvatar($event.id)"
                                :url="route('core.avatars.store')"
                                file-key="avatar"
                                v-if="isSelfVisiting">
                                <template v-slot:control="{ controlEvents }">
                                    <a class="button is-fullwidth is-info mt-1"
                                        v-on="controlEvents">
                                        <span class="icon">
                                            <fa icon="upload"/>
                                        </span>
                                        <span>
                                            {{ i18n('Avatar') }}
                                        </span>
                                    </a>
                                </template>
                            </uploader>
                            <a class="button is-fullwidth is-danger mt-1"
                                @click="logout"
                                v-if="isSelfVisiting">
                                <span class="icon">
                                    <fa icon="sign-out-alt"/>
                                </span>
                                <span>
                                    {{ i18n('Log out') }}
                                </span>
                            </a>
                            <a class="button is-fullwidth is-warning"
                                @click="$root.$emit('start-impersonating', profile.id)"
                                v-if="
                                    !isWebview
                                    && !isSelfVisiting
                                    && canAccess('core.impersonate.start')
                                    && !impersonating
                                ">
                                {{ i18n('Impersonate') }}
                            </a>
                            <a class="button is-fullwidth mt-1 is-warning"
                                @click="$router.push({
                                    name: 'administration.users.edit',
                                    params: { user: profile.id },
                                }).catch(routerErrorHandler)"
                                v-if="canAccess('administration.users.edit')">
                                <span class="icon">
                                    <fa icon="pencil-alt"/>
                                </span>
                                <span>
                                    {{ i18n('Edit') }}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <divider class="m-3"
                    v-if="isMobile"/>
                <div class="columns is-mobile is-multiline details mt-3">
                    <div class="column is-one-third has-text-right p-1">
                        <strong>{{ i18n('Group') }}:</strong>
                    </div>
                    <div class="column is-two-thirds p-1">
                        <span class="ml-2">
                            {{ profile.group.name }}
                        </span>
                    </div>
                    <div class="column is-one-third has-text-right p-1">
                        <strong>{{ i18n('Role') }}:</strong>
                    </div>
                    <div class="column is-two-thirds p-1">
                        <span class="ml-2">
                            {{ profile.role.name }}
                        </span>
                    </div>
                    <div class="column is-one-third has-text-right p-1">
                        <strong>{{ i18n('Email') }}:</strong>
                    </div>
                    <div class="column is-two-thirds p-1">
                        <span class="ml-2">
                            {{ profile.email }}
                        </span>
                    </div>
                    <div class="column is-one-third has-text-right p-1">
                        <strong>{{ i18n('Phone') }}:</strong>
                    </div>
                    <div class="column is-two-thirds p-1">
                        <span class="ml-2">
                            {{ profile.person.phone }}
                        </span>
                    </div>
                    <div class="column is-one-third has-text-right p-1">
                        <strong>{{ i18n('Birthday') }}:</strong>
                    </div>
                    <div class="column is-two-thirds p-1">
                        <span class="ml-2">
                            {{ dateFormat(profile.person.birthday) }}
                        </span>
                    </div>
                    <div class="column is-one-third has-text-right p-1">
                        <strong>{{ i18n('Gender') }}:</strong>
                    </div>
                    <div class="column is-two-thirds p-1">
                        <span class="ml-2">
                            {{
                                profile.person.gender
                                    ? enums.genders._get(profile.person.gender)
                                    : null
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <divider class="m-3"/>
        <div class="level is-mobile mb-3">
            <div class="level-item has-text-centered has-right-border">
                <div>
                    <p class="subtitle is-3">
                        {{ profile.loginCount }}
                    </p>
                    <p class="subtitle is-4">
                        {{ i18n('logins') }}
                    </p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="subtitle is-3">
                        {{ profile.actionLogCount }}
                    </p>
                    <p class="subtitle is-4">
                        {{ i18n('actions') }}
                    </p>
                </div>
            </div>
            <div class="level-item has-text-centered has-left-border">
                <div>
                    <p class="subtitle is-3">
                        {{ profile.rating }}
                    </p>
                    <p class="subtitle is-4">
                        {{ i18n('rating') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState, mapMutations, mapActions, mapGetters,
} from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUser, faSyncAlt, faTrashAlt, faUpload, faSignOutAlt, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Uploader } from '@enso-ui/uploader/bulma';
import Divider from '@enso-ui/divider';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';

library.add(faUser, faSyncAlt, faTrashAlt, faUpload, faSignOutAlt, faPencilAlt);

export default {
    name: 'UserProfile',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'routerErrorHandler'],

    components: { Uploader, Divider },

    data: () => ({
        profile: null,
    }),

    computed: {
        ...mapState(['user', 'meta', 'enums', 'impersonating']),
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['isMobile']),
        ...mapGetters(['isWebview']),
        isSelfVisiting() {
            return this.user.id === this.profile.id;
        },
        avatarId() {
            return this.isSelfVisiting
                ? this.user.avatar.id
                : this.profile.avatar.id;
        },
    },

    created() {
        if (this.isAuth) {
            this.fetch();
        }
    },

    methods: {
        ...mapMutations(['setUserAvatar']),
        ...mapActions('auth', ['logout']),
        fetch() {
            axios.get(this.route(this.$route.name, this.$route.params.user))
                .then(response => (this.profile = response.data.user))
                .catch(this.errorHandler);
        },
        updateAvatar() {
            axios.patch(this.route('core.avatars.update', this.user.avatar.id))
                .then(({ data }) => this.setUserAvatar(data.avatarId))
                .catch(this.errorHandler);
        },
        dateFormat(date) {
            return date
                ? format(date, this.meta.dateFormat)
                : null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .avatar {
        margin: auto;
    }

    .controls, .details {
        justify-content: center;
    }

    .has-left-border {
        border-left: 1px solid rgba(0,0,0,0.2);
    }

    .has-right-border {
        border-right: 1px solid rgba(0,0,0,0.2);
    }

    .details > .column {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
