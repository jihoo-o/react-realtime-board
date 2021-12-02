// class ItemBox extends HTMLElement {
//     // TODO
//     // use constructor or member function
//     constructor() {
//         super();
//         this.div = document.createElement('div');
//         this.div.attachShadow({ mode: 'open' });
//         console.log(this.div);
//         // this.div.style.backgroundColor = 'red';
//         // this.div.style.width = '500px';
//         // this.div.style.height = '500px';
//     }

//     connectedCallback() {
//         this.div.addEventListener('click', this.handleItemClick);
//     }

//     removeEvents() {
//         this.div.removeEventListener('click', this.handleItemClick);
//     }

//     handleItemClick(e) {
//         e.stopPropagation();
//         console.log('item-box is clicked!');
//     }

//     // TODO
//     // style -> attributeChangedCallback
// }

// customElements.get('item-box') || customElements.define('item-box', ItemBox);
