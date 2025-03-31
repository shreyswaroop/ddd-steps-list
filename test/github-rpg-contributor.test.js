import { html, fixture, expect } from '@open-wc/testing';
import "../github-rpg-contributor.js";

describe("GithubRpgContributor test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <github-rpg-contributor
        title="title"
      ></github-rpg-contributor>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
