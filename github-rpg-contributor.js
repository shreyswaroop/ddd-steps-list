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
    super();
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
      .step-card {
        border: 2px solid var(--ddd-color-5, #ccc);
        border-radius: 12px;
        padding: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-background, #fff);
        box-shadow: var(--ddd-box-shadow);
      }

      .step-header {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-2);
      }

      .step-number {
        font-weight: bold;
        font-size: var(--ddd-font-size-xl, 1.25rem);
        color: var(--ddd-color-7, #333);
      }

      h3 {
        margin: 0;
        font-size: var(--ddd-font-size-l, 1.125rem);
      }

      .step-content {
        font-size: var(--ddd-font-size-s, 1rem);
      }

      a {
        color: var(--ddd-theme-link-color, #1e407c);
        text-decoration: underline;
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
      <div class="top-section">
        <h3>
          Repo:
          <a href="https://github.com/${this.org}/${this.repo}" target="_blank">
            ${this.org}/${this.repo}
          </a>
        </h3>
      </div>
      ${this.items.slice(0, this.limit).map((contributor, index) => html`
        <div class="step-card">
          <div class="step-header">
            <span class="step-number">Step ${index + 1}</span>
            <h3>${contributor.login}</h3>
          </div>
          <div class="step-content">
            <p>Contributions: ${contributor.contributions}</p>
            <a href="https://github.com/${contributor.login}" target="_blank">
              View GitHub Profile
            </a>
          </div>
        </div>
      `)}
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