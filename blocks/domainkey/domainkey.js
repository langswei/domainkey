// import { readBlockConfig } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // this app is obsolete, redirect to new location
  document.location = 'https://aemcs-workspace.adobe.com/rum/generate-domain-key';

  // const cfg = readBlockConfig(block);
  block.innerHTML = '';

  const form = `
    <label for='url'>Domain</label>
    <input id='url' name='url' value=''>
    <button class="collapsible">Advanced (optional)</button>
    <div class="content">
        <label for='newkey'>Add to existing domain key</label>
        <input id='newkey' name='newkey' value='' placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'>
        <label for='expiry'>Expiration Date</label>
        <input id='expiry' name='expiry' type='date' value=''>
    </div>
    <br>
    <button id='generate'>Generate</button>
    <div id='key'></div>
  `;

  block.innerHTML = form;

  block.querySelector('#url').addEventListener('blur', () => {
    block.querySelector('#url').value = block.querySelector('#url').value.replace(/^http(s)*:\/\//, '');
  });

  const coll = document.getElementsByClassName('collapsible');
  let i;

  for (i = 0; i < coll.length; i += 1) {
    // eslint-disable-next-line func-names
    coll[i].addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  }

  block.querySelector('#generate').addEventListener('click', () => {
    block.querySelector('#generate').style.display = 'none';
    block.querySelector('#url').disabled = 'disabled';
    block.querySelector('#newkey').disabled = 'disabled';
    block.querySelector('#expiry').disabled = 'disabled';
    block.querySelector('#key').innerHTML = 'Generating...';

    // create new domain key by making API request
    const endpoint = new URL('https://eynvwoxb7l.execute-api.us-east-1.amazonaws.com/helix-services/domainkey-provider/ci191');
    const body = {
      domain: block.querySelector('#url').value,
      domainkey: block.querySelector('#newkey').value,
      expiry: block.querySelector('#expiry').value,
    };

    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((data) => {
      if (data.status === 'success') {
        block.querySelector('#key').innerHTML = `The key has been generated: ${data.key}`;
      }
    }).catch(() => {
      block.querySelector('#key').innerHTML = 'Error generating key.  Ensure you are browsing from <a href="https://generate--domainkey--langswei.hlx.live">https://generate--domainkey--langswei.hlx.live</a>.';
    });
  });
}
