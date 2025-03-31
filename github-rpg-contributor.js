/**
 * Copyright 2025 shreyswaroop
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `github-rpg-contributor`
 * 
 * @demo index.html
 * @element github-rpg-contributor
 */
export class GithubRpgContributor extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributor";
  }

  constructor() {
    ssuper();
    this.items = []
    this.org=''
    this.repo=''
    this.title = "";
    this.limit = 25;
    this.t = {
      title: "title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      org: { type: String },
      repo: { type: String },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--github-rpg-contributor-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--ddd-spacing-4);
      }
      .character-card {
          padding: var(--ddd-spacing-3);
          text-align: center;
          min-width: 176px;
      }
      .user-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--ddd-border-radius);
          background-color: var(--ddd-theme-accent);
          box-shadow: var(--ddd-box-shadow);
      }

    `];
  }

  updated(changedProperties) {
    super.updated?.(changedProperties);
    if (changedProperties.has("org") || changedProperties.has("repo")) {
      this.getContributors();
    }
  }

  getContributors() {
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.items = data;
      })
      .catch((error) => {
        console.error("Error loading contributors:", error);
      });
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="container">
        <div class="top-section">
          <h3>
            Repo:
            <a
              href="https://github.com/${this.org}/${this.repo}"
              >${this.org}/${this.repo}</a>
          </h3>
        </div>
        <slot></slot>
        <div class="contributors-list">
          ${this.items
            .filter((user, idx) => idx < this.limit)
            .map(
              (user) => html`
                <div class="contributor-card">
                  <rpg-character seed="${user.login}"></rpg-character>
                  <div class="user-meta">
                    <a href="https://github.com/${user.login}" target="_blank">
                      ${user.login}
                    </a>
                    Contributions: ${user.contributions}
                  </div>
                </div>
              `
            )}
        </div>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributor.tag, GithubRpgContributor);