/**
 * Copyright 2019 Centrality Investments Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { browser } from 'webextension-polyfill-ts';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CONTENT_SCRIPT_PORT_NAME } from '../config';

const injectScript = () => {
  try {
    const path = browser.extension.getURL('singleSource.js');
    const inject = window.document.createElement('script');
    inject.setAttribute('type', 'text/javascript');
    inject.setAttribute('src', path);
    const head = window.document.head || window.document.documentElement;
    head.appendChild(inject);
  } catch (e) {
    console.error('SingleSource script injection failed >>> ', e);
  }
};

const setupCommunication = () => {
  const port = browser.runtime.connect(null, {
    name: CONTENT_SCRIPT_PORT_NAME
  });

  port.onMessage.addListener(data => {
    window.postMessage(data, window.origin);
  });

  fromEvent<MessageEvent>(window, 'message')
    .pipe(filter(e => e.source === window))
    .subscribe(e => port.postMessage(e.data));
};

const init = () => {
  window.postMessage({ type: 'init' }, window.origin);
};

injectScript();
setupCommunication();
window.onload = () => init();
