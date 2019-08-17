'use strict';

if (customElements) {
    customElements.define('teochew-popup', 
        class TeochewPopup extends HTMLElement {
            constructor() {
                super();

                const shadowRoot = this.attachShadow({mode: 'open'});
                const sheet = new CSSStyleSheet();
            }
        }
    );
}