<template>
    <modal>
        <enso-form class="box has-background-light"
            v-bind="$attrs"
            disable-state/>
    </modal>
</template>

<script>
import { Modal } from '@liberu-ui/modal/bulma';
import { EnsoForm } from '@liberu-ui/forms/bulma';

export default {
    name: 'TokenForm',

    components: { Modal, EnsoForm },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    .token-form .modal-content {
        overflow: unset;
    }

    @media screen and (max-width: 1023px) {
        .token-form .modal-content {
            width: 95%;
        }
    }
</style>
