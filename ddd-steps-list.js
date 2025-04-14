import { LitElement, html, css } from "lit";

// ddd-steps-list-item component
class DddStepsListItem extends LitElement {
  static get properties() {
    return {
      step: { type: Number, reflect: true },
      dddPrimary: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.step = 0;
    this.dddPrimary = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: var(--ddd-spacing-6, 24px);
      }

      .wrapper {
        display: flex;
        align-items: flex-start;
      }

      .circle {
        width: var(--ddd-spacing-8, 32px);
        height: var(--ddd-spacing-8, 32px);
        border-radius: var(--ddd-radius-full, 9999px);
        background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
        color: var(--ddd-theme-default-white, white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--ddd-font-weight-bold, bold);
        font-size: var(--ddd-font-size-md, 1rem);
        margin-right: var(--ddd-spacing-4, 16px);
        flex-shrink: 0;
      }

      .content {
        flex: 1;
      }

      @media (max-width: 768px) {
        .wrapper {
          flex-direction: column;
        }

        .circle {
          margin-bottom: var(--ddd-spacing-2, 8px);
        }
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="circle">${this.step}</div>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }
}

customElements.define("ddd-steps-list-item", DddStepsListItem);

// ddd-steps-list component
class DddStepsList extends LitElement {
  static get properties() {
    return {
      dddPrimary: { type: Boolean, attribute: "ddd-primary", reflect: true }
    };
  }

  constructor() {
    super();
    this.dddPrimary = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--ddd-spacing-4, 16px);
        background-color: var(--ddd-theme-default-white, white);
        color: var(--ddd-theme-default-black, black);
        border-radius: var(--ddd-radius-lg, 12px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        max-width: 600px;
        margin: 0 auto;
      }
    `;
  }

  render() {
    return html`<slot @slotchange="${this._renumberItems}"></slot>`;
  }

  firstUpdated() {
    this._renumberItems();
  }

  _renumberItems() {
    const items = Array.from(this.children);
    let index = 1;

    items.forEach((el) => {
      if (el.tagName.toLowerCase() === "ddd-steps-list-item") {
        el.step = index++;
        el.dddPrimary = this.dddPrimary;
      } else {
        this.removeChild(el);
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has("dddPrimary")) {
      this._renumberItems();
    }
  }
}

customElements.define("ddd-steps-list", DddStepsList);
