import { parse } from 'node-html-parser'
import fetch from 'isomorphic-unfetch'
import formurlencoded from 'form-urlencoded';

const parseTable = ({html, tableSelector, rowSelector}) => {
  const table = parse(html).querySelector(tableSelector);
  const headers = ['ID', ...Array.from(table.querySelectorAll('th')).map(h => h.text.trim())]
  const rowEls = Array.from(table.querySelectorAll(rowSelector))
  const rows = rowEls.map(row => {
    const link = row.querySelector('a');
    const id = link.getAttribute('href').split('/').pop();
    return [id, ...Array.from(row.querySelectorAll('td'))
      .map(col => col.text.trim())]
  });
  return [headers, rows];
}

const endpoints = {
  settings: {
    path: () => 'hub/edit',
    parser: async res => {
      const html = await res.text();
      const nodes = Array.from(parse(html).querySelector('#hubPopup').childNodes);
      return nodes.reduce((acc, node) => {
        if (node.nodeType !== 1) return acc;

        const header = node.querySelector('.menu-header');
        if (header) {
          const headerText = header.text.trim();
          const value = node.querySelector('.menu-text');
          if (headerText === 'Default Text To Speech (TTS) Voice') {
            const selectedOption = Array.from(value.querySelectorAll('option')).find(o => o.getAttribute('selected') !== undefined);
            acc[headerText] = selectedOption.text.trim();
          } else {
            acc[headerText] = value.text.trim();
          }
        }

        return acc;
      }, {})
    }
  },
  apps: {
    path: () => 'app/list',
    parser: async res => {
      const html = await res.text();
      const [headers, rows] = parseTable({
        html,
        tableSelector: '#hubitapps-table',
        rowSelector: '.app-row'
      });
      return { headers, rows }
    }
  },
  drivers: {
    path: () => 'driver/list',
    parser: async res => {
      const html = await res.text();
      const [headers, rows] = parseTable({
        html,
        tableSelector: '#devicetype-table',
        rowSelector: '.driver-row'
      });
      return { headers, rows }
    }
  },
}

class Hub {
  constructor (hubUrl) {
    this.hubUrl = hubUrl;
  }

  async fetch(endpoint, id) {
    const { path, parser } = endpoints[endpoint];
    const res = await fetch(`http://hubitat/${path(id)}`)
    if (parser) {
      return parser(res);
    }
    return res.json();
  }

  async get(type, id) {
    const res = await Promise.all([
      fetch(`http://hubitat/${type}/ajax/code?id=${id}`)
        .then(res => res.json()),
      fetch(`http://hubitat/${type}/editor/${id}`)
        .then(res => res.text())
    ]);
    let [payload, html] = res;
    const importUrl = parse(html).querySelector('#importUrl').getAttribute('value').replace(/\s/g, '');
    let current, latestSource
    if (importUrl && importUrl !== '') {
      latestSource = await fetch(importUrl).then(res => res.text());
      current = latestSource === payload.source
    }
    return {
      importUrl,
      current,
      latestSource,
      ...payload,
    }
  }

  update({ type, id, version, source }) {
    return fetch(`http://hubitat/${type}/ajax/update`, {
      method: 'POST',
      body: formurlencoded({
        id, version, source
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(res => res.json());
  }

  getApp(id) {
    return this.get('app', id);
  }

  updateApp({ id, version, source }) {
    return this.update({type: 'app', id, version, source});
  }

  getDriver(id) {
    return this.get('driver', id);
  }

  updateDriver({ id, version, source }) {
    return this.update({type: 'driver', id, version, source});
  }
}

export default Hub;
