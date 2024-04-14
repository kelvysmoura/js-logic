const load = async (module) => {
  return (await import(`${BASE_PATH}/${module}`)).default
}

const challenges = await load('challenges.js');
const keys =  await load('src/storage-keys.js');
const ChallengeStorage = await load('src/challenge-storage.js');
const challengeExports = await load('src/challenge-exports.js');
const markdown = await load('src/markdown.js');

const base64 = window.location.href.split('?base64=')[1]

if (base64) challengeExports.setBase64ToLocalStorage(base64)

const mdconverter = new showdown.Converter();

const challengeList = document.querySelector('#challenge-list ul');
const modalElement = document.getElementById('modal-details');

function createChallengeItem({ target, title, progress }) {
  progress = Number(progress);
  let progressClass = progress === 0 
    ? 'danger' 
    : progress < 100 ? 'warning' : 'success'
  return `
    <li class="p-3 rounded-1 challenge-item custom-bg-default"
        data-challenge-target="${target}">
        ${ title}
        ${
          progress >= 0
            ? `<span 
                class="text-bg-${progressClass}
                        ms-2 badge rounded-pill">
                  ${progress}%
                </span>`
            : ""
        }
      </a>
    </li>
  `;
}

const list = [];
let progress = [];
for (let target in challenges) {
  let storage = ChallengeStorage(target);
  let params = {
    target,
    title: challenges[target].title
  }
  if (storage.progress()) {
    params.progress = storage.progress();
  }

  list.push(createChallengeItem(params))
}

challengeList.innerHTML = list.join('\n');

Array.from(document.querySelectorAll('[data-challenge-target]')).forEach(item => {
  item.addEventListener('click', event => {
    let fn = event.target.dataset.challengeTarget;
    let challenge = challenges[fn]
    modalElement.querySelector('.modal-title').innerHTML = challenge.title;
    modalElement.querySelector('.modal-body').innerHTML = markdown.toHtml(challenge.details);
    modalElement.querySelector('.modal-action').href = BASE_PATH + `/#${fn}`
    let modal = new bootstrap.Modal(modalElement)
    modal.show();
  })
})

document.getElementById('copyLinkButton').addEventListener('click', async () => {
  const path = challengeExports.getLink();
  await navigator.clipboard.writeText(path);
  const copyLinkButton = document.getElementById('copyLinkButton')
  copyLinkButton.innerText = 'Copiado!'
  setTimeout(() => {
    copyLinkButton.innerText = 'Copiar Histórico'
  }, 1500)
})
