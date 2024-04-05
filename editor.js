
function getHash(url) {
  url = url ?? document.location.href
  url = new URL(url);
  return url.hash.slice(1);
}

if (!getHash()) {
  document.location.href = "challenges";
}

import EditorConfig from "./src/editor-config.js";
import Challenges from "./challenges.js";
import keys from "./src/storage-keys.js";
import ChallengeStorage from "./src/challenge-storage.js";

const editor = monaco.editor.create(document.getElementById('editor'), EditorConfig);

let storage;

let module;
let next;

async function importModule() {
  module = Challenges[getHash()];
  if (!module) {
    return document.location.hash = "404";
  }

  let keys = Object.keys(Challenges)
  let current = keys.indexOf(getHash());
  let nextChallenge = current >= 0 ? current+1 : false; 
  next = keys[nextChallenge]
  return module;
}

let timeout;
editor.onDidChangeModelContent((event) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    storage.jscode(editor.getValue())
  }, 2000);
});

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    storage.jscode(editor.getValue())
    clearTimeout(timeout)
  }
});

const testCasesElement = document.getElementById('test-cases');
const alertElement = document.querySelector(".alert");
const executElement = document.getElementById('execute');
const mainElement = document.getElementById('main');
const modalElement = document.getElementById('modal-details');
const modalOverlay = document.getElementById('modal-overlay');
const titleElement = document.getElementById('title');
const usernameElement = document.getElementById('username');
const nextButton = document.getElementById('next')

function renderRules(rules) {
  testCasesElement.innerHTML = `<ul>${rules.join('\n')}</ul>`
}

function mdToHtml(text) {
  return mdconverter.makeHtml(text);
}

function isJsonString(string) {
  try {
    JSON.parse(string);
    return true
  } catch (error) {
   return false
  }
}

function convertToStringType(text) {
  if(typeof text === 'object') {
    return JSON.stringify(text);
  }
  return typeof text === 'string' && isJsonString(text) === false ? `"${text}"` : text;
}

function createFunctionLabel(test, functionName) {
  let params = test.params.map(param => {
    return convertToStringType(param)
  }).join(', ');
  return `${functionName}(${params});`;
}

function createTestErroLines(expect, result) {
  return `
    <p><strong>Valor esperado: ${convertToStringType(expect)}</strong></p>
    <p><strong>Valor retornado: ${convertToStringType(result)}</strong><p>
  `;
}

function getStatusList(index = null) {
  let statusList = storage.status();

  if(index === null) {
    return statusList;
  }

  if(statusList) {
    return statusList[index];
  }

  return statusList;
}


function getTestTemplate(index, icon, content) {
  let status = getStatusList(index)
  let hasAttention = status?.status === 'attention';
  icon = status?.status ? `public/${status.status}.svg` : icon;
  return `
    <li id="test-${index}" class="p-2 m-2 border border-dark-subtle rounded-1" data-status="${status?.status || 'default'}">
      <div class="d-flex align-items-center column-gap-2">
        <div class="icons">
          <img src="${icon}">
        </div>
        ${content}
      </div>
      <div class="task-error mt-2 ${ hasAttention ? "d-block" : "d-none" }">
      ${ hasAttention ? createTestErroLines(status.expect, status.result) : "" }
      </div>
    </li>
  `;
}

function changeIcon(index, icon) {
  let element = document.querySelector(`#test-${index} .icons`);
  element.innerHTML = `<img src="public/${icon}.svg" class="${icon}">`;
}

function buildTestList(tests) {
  return tests.map((test, index) => {
    let liContent = createFunctionLabel(test, getHash())
    return getTestTemplate(index, 'public/play.svg', mdToHtml(liContent))
  })
}

function addAlert(content) {
  alertElement.classList.remove('d-none');
  alertElement.classList.add('d-block');
  alertElement.innerHTML = content
}


function removeAlert() {
  alertElement.classList.add('d-none');
  alertElement.classList.remove('d-block');
  alertElement.innerHTML = '';
}

function renderException(exception) {
  renderRules(buildTestList(module.tests))
  addAlert(exception) 
}

function disableNextButton() {
  nextButton.setAttribute('disabled', true);
  nextButton.classList.remove('btn-success')
  nextButton.classList.add('bg-light')
}

function catchBlock(exception) {
  storage.error(exception);
  storage.progress(0);
  storage.remove(keys.STATUS);
  disableNextButton()
  renderException(exception);
}

async function sleep(seconds) {
  return await new Promise(revolve => setTimeout(revolve, seconds*1000));
}

let progress = [];

async function doExecute() {

  this.setAttribute('disabled', true);

  removeAlert();

  let totalSuccess = 0;

  let content = editor.getValue();
  let execute;

  let returnFunction = `
try { 
  return ${getHash()} 
} catch(e) { 
  throw new SyntaxError("Function " + e.message) 
}
  `;

  try {
    content = new Function(`${content};\n${returnFunction}`);
    execute = content();
    storage.remove(keys.ERROR);
  } catch (exception) {
    sleep(2)
    catchBlock(exception);
    progress = [];
    totalSuccess = 0;
    this.removeAttribute('disabled');
    disableNextButton()
    return;
  }

  let percentage = 100 / module.tests.length;

  for (let index in module.tests) {
    progress[index] = {};
    let test = module.tests[index];

    let li = document.getElementById(`test-${index}`);

    let taskError = li.querySelector(`.task-error`)
    taskError.classList.add('d-none');
    changeIcon(index, 'loading');

    await sleep(0.5)

    let result;

    try {
      result = execute(...test.params);
    } catch (exception) {
      catchBlock(exception);
      progress = [];
      totalSuccess = 0;
      break;
    }

    result = Array.isArray(result) 
      ? JSON.stringify(result) 
      : result !== null && typeof result === 'object' 
        ? JSON.stringify(result)
        : result

    test.expect = Array.isArray(test.expect) 
      ? JSON.stringify(test.expect) 
      : test.expect !== null && typeof test.expect === 'object'
        ? JSON.stringify(test.expect)
        : test.expect;

    if (result !== test.expect) {
      taskError.innerHTML = createTestErroLines(test.expect, result);
      taskError.classList.remove('d-none')
      li.setAttribute('data-status', 'attention')
      changeIcon(index, 'attention');
      progress[index].status = 'attention';
      progress[index].expect = test.expect;
      progress[index].result = result;
      disableNextButton()
      continue;
    }

    li.setAttribute('data-status', 'success')
    changeIcon(index, 'success');
    totalSuccess++;

    progress[index].status = 'success';
    
  }

  totalSuccess = percentage * totalSuccess
  storage.progress(totalSuccess)
  storage.status(progress)

  if (progress.length === 0) {
    storage.remove(keys.STATUS);
  }

  if(totalSuccess === 100 && next) {
    nextButton.classList.remove('bg-light');
    nextButton.classList.add('btn-success');
    nextButton.removeAttribute('disabled')
  }

  this.removeAttribute('disabled');
  totalSuccess = 0;
}

executElement.addEventListener('click', function () {
  doExecute.call(this)
});


let overlayTimeout;


nextButton.addEventListener('click', event => {
  location.hash = `#${next}`;
})

async function main (event) {
  modalOverlay.classList.add('d-block');  

  if (overlayTimeout) {
    clearTimeout(overlayTimeout)
  }

  removeAlert();

  nextButton.classList.add('bg-light');
  nextButton.classList.remove('btn-success');
  nextButton.setAttribute('disabled', true)

  try{
    if(getHash() === '404'){
      throw new Error(404)
    }
    
    storage = ChallengeStorage(getHash());

    nextButton.classList.remove('d-none');

    await importModule();

    if(!next) {
      nextButton.classList.add('d-none');
    }

    editor.setValue(storage.jscode());
    titleElement.innerHTML = mdToHtml(`## ${module.title}`);''
    usernameElement.innerHTML = mdToHtml(`<small class="text-secondary">by <a href="https://github.com/${module.username}" class="text-secondary" target="_blank">${module.username}</a></small>`);

    renderRules(buildTestList(module.tests));
    
    document.getElementById('404').classList.add('d-none')
    document.getElementById('404').innerHTML = '';
    
    mainElement.classList.remove('d-none');

    modalElement.querySelector('.modal-body').innerHTML = mdToHtml(module.details);

    let pageError = storage.error();
    
    if(pageError) {
      addAlert(pageError)
    }

  } catch (exception) {
    console.log(exception);

    if (getHash() === '404') {
      document.querySelector('#main').classList.add('d-none')
      document.getElementById('404').classList.remove('d-none');
      document.getElementById('404').innerHTML = `404 NOT FOUND`;
    }
  }

  if (storage && Number(storage.progress()) === 100) {
    nextButton.classList.remove('bg-light');
    nextButton.classList.add('btn-success');
    nextButton.removeAttribute('disabled')
  }

  overlayTimeout = setTimeout(() => {
    modalOverlay.classList.remove('d-block')
  }, 500);
}

main();

window.addEventListener('hashchange', main)