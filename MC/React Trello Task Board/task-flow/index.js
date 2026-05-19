const LABELS = [
  { id: 'l1', name: 'Urgent & Important', color: '#EF4444' },
  { id: 'l2', name: 'Not Urgent & Important', color: '#F97316' },
  { id: 'l3', name: 'Urgent & Not Important', color: '#3B82F6' },
  { id: 'l4', name: 'Not Urgent & Not Important', color: '#71717A' },
];

const COVER_COLORS = ['#EF4444', '#F97316', '#3B82F6', '#71717A'];

// MainDataObject
let state = {
  boardTitle: 'Time Management Matrix',
  listOrder: ['l-1', 'l-2', 'l-3', 'l-4'],
  lists: {
    'l-1': { id: 'l-1', title: 'Quadrant 1', cardIds: ['c-1'] },
    'l-2': { id: 'l-2', title: 'Quadrant 2', cardIds: ['c-2'] },
    'l-3': { id: 'l-3', title: 'Quadrant 3', cardIds: ['c-3'] },
    'l-4': { id: 'l-4', title: 'Quadrant 4', cardIds: ['c-4'] },
  },
  cards: {
    'c-1': {
      id: 'c-1',
      title: 'Urgent & Important',
      description:
        'Tasks that require immediate attention, such as crises or pressing deadlines.',
      labels: [''],
      dueDate: `${new Date().toLocaleDateString()}`, // Today
      checklist: [{ id: 'ci-1', text: 'Add your task list', done: false }],
      coverColor: `${COVER_COLORS[0]}`, // Red
    },
    'c-2': {
      id: 'c-2',
      title: 'Not Urgent & Important',
      description:
        'Activities focused on long-term goals, planning and personal growth.',
      labels: [''],
      dueDate: `${new Date().toLocaleDateString()}`, // Today
      checklist: [{ id: 'ci-2', text: 'Add your task list', done: false }],
      coverColor: `${COVER_COLORS[1]}`, // Orange
    },
    'c-3': {
      id: 'c-3',
      title: 'Urgent & Not Important',
      description:
        'Distractions and interruptions that need to be minimized, like unnecessary meetings.',
      labels: [''],
      dueDate: `${new Date().toLocaleDateString()}`, // Today
      checklist: [{ id: 'ci-3', text: 'Add your task list', done: false }],
      coverColor: `${COVER_COLORS[2]}`, // Blue
    },
    'c-4': {
      id: 'c-4',
      title: 'Not Urgent & Not Important',
      description:
        'Time-wasting activities that should be minimized or eliminated, such as excessive social media use.',
      labels: [''],
      dueDate: `${new Date().toLocaleDateString()}`, // Today
      checklist: [{ id: 'ci-4', text: 'Add your task list', done: false }],
      coverColor: `${COVER_COLORS[3]}`, // Gray
    },
  },
  openCardId: null,
};

// LocalStorage Key
const STORAGE_KEY = 'taskflow-board-data';

// Save Board State
function saveBoard() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Load Board State
function loadBoard() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    state = JSON.parse(saved);
  } catch (err) {
    console.error('Failed to load board:', err);
  }
}

// IDCounterForNewItems
let idCounter = 100;
function uid() {
  return 'id-' + ++idCounter + '-' + Math.random().toString(36).slice(2, 6);
}

// FullBoardRender
function renderBoard() {
  const board = document.getElementById('board');
  const addCol = document.getElementById('addListCol');

  // RemoveOldList
  board.querySelectorAll('.list').forEach(el => el.remove());

  // InsertEachList
  state.listOrder.forEach(listId => {
    const listEl = buildListEl(state.lists[listId]);
    board.insertBefore(listEl, addCol); // InsertBeforeAddListColumn
  });
}

// BuildAList
function buildListEl(list) {
  const cards = list.cardIds.map(id => state.cards[id]).filter(Boolean); // GetCards

  const el = document.createElement('div');
  el.className = 'list';
  el.dataset.listId = list.id; // DataAttributeForDrag

  el.innerHTML = `
    <!-- ListHeader -->
    <div class="list-header" draggable="true" data-drag-type="list" data-list-id="${list.id}">
      <span class="list-drag-handle">⠿</span>
      <input class="list-title-input" value="${escHtml(list.title)}" max_length="60"
        onchange="updateListTitle('${list.id}',this.value)"
        onkeydown="if(event.key==='Enter')this.blur()" />
      <span class="list-count">${cards.length}</span>
      <div class="rel">
        <button class="list-menu-btn" onclick="toggleListMenu(event,'${list.id}')">⋯</button>
      </div>
    </div>

    <!-- CardsContainer -->
    <div class="cards-container" id="cards-${list.id}"
      data-drop-zone="true" data-list-id="${list.id}">
      ${cards.map(c => buildCardHtml(c, list.id)).join('')}
    </div>

    <!-- AddCard - ButtonOrForm -->
    <button class="add-card-btn" id="addBtn-${list.id}" onclick="showAddCard('${list.id}')">
      ➕ Add a card
    </button>
    <div class="add-card-form hidden" id="addForm-${list.id}">
      <textarea placeholder="Enter a title for this card…" rows="2"
        id="addInput-${list.id}"
        onkeydown="handleAddCardKey(event,'${list.id}')"></textarea>
      <div class="form-btns">
        <button class="btn-primary" onclick="submitAddCard('${list.id}')">Add card</button>
        <button class="btn-ghost" onclick="hideAddCard('${list.id}')">✕</button>
      </div>
    </div>
  `;

  return el;
}

// BuildACardHTMLString
function buildCardHtml(card, listId) {
  if (!card) return '';

  // LabelPills
  const labelHtml = (card.labels || [])
    .map(lid => {
      const lbl = LABELS.find(l => l.id === lid);
      return lbl
        ? `<div class="card-label" style="background:${lbl.color}" title="${lbl.name}"></div>`
        : '';
    })
    .join('');

  // ChecklistBadge
  const total = card.checklist?.length || 0;
  const done = card.checklist?.filter(i => i.done).length || 0;
  const allDone = total > 0 && done === total;
  const checkBadge =
    total > 0
      ? `<span class="card-badge ${allDone ? 'badge-green' : 'badge-gray'}">☑ ${done}/${total}</span>`
      : '';

  // DueDateBadge
  let dateBadge = '';
  if (card.dueDate) {
    const due = new Date(card.dueDate),
      now = new Date(),
      diff = due - now;
    const fmt = due.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const cls =
      diff < 0 ? 'badge-red' : diff < 86400000 ? 'badge-yellow' : 'badge-gray';
    dateBadge = `<span class="card-badge ${cls}">📅 ${fmt}</span>`;
  }

  // ProgressBar
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const progressBar =
    total > 0
      ? `<div class="progress-bar"><div class="progress-fill ${allDone ? 'done' : ''}" style="width:${pct}%"></div></div>`
      : '';

  // Cover
  const cover = card.coverColor
    ? `<div class="card-cover" style="background:${card.coverColor}"></div>`
    : '';

  // Description icon
  const descIcon = card.description
    ? `<span class="card-badge badge-gray">📝</span>`
    : '';

  return `
    <div class="card" id="card-${card.id}"
      draggable="true"
      data-drag-type="card"
      data-card-id="${card.id}"
      data-list-id="${listId}"
      onclick="openModal('${card.id}')">
      ${cover}
      <div class="card-body">
        ${labelHtml ? `<div class="card-labels">${labelHtml}</div>` : ''}
        <div class="card-title">${escHtml(card.title)}</div>
        ${checkBadge || dateBadge || descIcon ? `<div class="card-meta">${descIcon}${dateBadge}${checkBadge}</div>` : ''}
        ${progressBar}
      </div>
      <!-- HoverActions -->
      <div class="card-actions" onclick="event.stopPropagation()">
        <button class="card-action-btn" onclick="openModal('${card.id}')" title="Edit">✏️</button>
        <button class="card-action-btn del" onclick="deleteCard('${card.id}','${listId}')" title="Delete">🗑️</button>
      </div>
    </div>
  `;
}

// RefreshASingleCard
function refreshCard(cardId) {
  const el = document.getElementById('card-' + cardId);
  if (!el) return;
  const listId = el.dataset.listId;
  const card = state.cards[cardId];
  if (!card) return;
  // ReplaceOldElementWithNewHTML
  const tmp = document.createElement('div');
  tmp.innerHTML = buildCardHtml(card, listId);
  const newEl = tmp.firstElementChild;
  el.replaceWith(newEl);
  // Re-BindDragEvents
  bindCardDragEvents(newEl);
}

// UpdateListCardCount
function updateListCount(listId) {
  const list = state.lists[listId];
  if (!list) return;
  const countEl = document.querySelector(
    `[data-list-id="${listId}"] .list-count`,
  );
  if (countEl) countEl.textContent = list.cardIds.length;
}

// DragAndDrop
let dragState = {
  type: null,
  cardId: null,
  listId: null,
  listElId: null,
  listIndex: null,
};

// BindDragEventsToAllCardsAndLists
function bindDragEvents() {
  document.querySelectorAll('.card').forEach(bindCardDragEvents);
  document
    .querySelectorAll('[data-drag-type="list"]')
    .forEach(bindListDragEvents);
  document.querySelectorAll('.cards-container').forEach(bindDropZoneEvents);
}
function bindCardDragEvents(el) {
  el.addEventListener('dragstart', onCardDragStart);
  el.addEventListener('dragend', onCardDragEnd);
}
function bindListDragEvents(el) {
  el.addEventListener('dragstart', onListDragStart);
  el.addEventListener('dragend', onListDragEnd);
}
function bindDropZoneEvents(el) {
  el.addEventListener('dragover', onDropZoneDragOver);
  el.addEventListener('dragleave', onDropZoneDragLeave);
  el.addEventListener('drop', onDropZoneDrop);
}

// CardDragStart
function onCardDragStart(e) {
  const el = e.currentTarget;
  dragState = {
    type: 'card',
    cardId: el.dataset.cardId,
    listId: el.dataset.listId,
  };
  el.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', el.dataset.cardId);
  setTimeout(() => (el.style.opacity = '0.4'), 0);
}
function onCardDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  e.currentTarget.style.opacity = '';
  clearDragHighlights();
}

// ListDragStart
function onListDragStart(e) {
  const listId = e.currentTarget.dataset.listId;
  dragState = {
    type: 'list',
    listElId: listId,
    listIndex: state.listOrder.indexOf(listId),
  };
  const listEl = e.currentTarget.closest('.list');
  listEl.classList.add('dragging-list');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', listId);
}
function onListDragEnd(e) {
  document
    .querySelectorAll('.list')
    .forEach(l => l.classList.remove('dragging-list', 'drag-over-list'));
}

// DragOverDropZone
function onDropZoneDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

  if (dragState.type === 'list') {
    // ListDragOver
    const hoverList = e.currentTarget.closest('.list');
    if (hoverList && hoverList.dataset.listId !== dragState.listElId) {
      hoverList.classList.add('drag-over-list');
    }
    return;
  }

  // CardDragOver
  const zone = e.currentTarget;
  const cards = [...zone.querySelectorAll('.card:not(.dragging)')];
  const afterCard = getDragAfterCard(zone, e.clientY); // WhereToInsert

  cards.forEach(c => c.classList.remove('drag-over-card'));
  if (afterCard) afterCard.classList.add('drag-over-card');
}

// DropZoneLeave
function onDropZoneDragLeave(e) {
  e.currentTarget.closest('.list')?.classList.remove('drag-over-list');
}

// DropHandler
function onDropZoneDrop(e) {
  e.preventDefault();
  clearDragHighlights();

  const destListEl = e.currentTarget.closest('.list');
  if (!destListEl) return;
  const destListId = destListEl.dataset.listId;

  if (dragState.type === 'list') {
    // ListReOrder
    const srcIdx = state.listOrder.indexOf(dragState.listElId);
    const dstIdx = state.listOrder.indexOf(destListId);
    if (srcIdx !== -1 && dstIdx !== -1 && srcIdx !== dstIdx) {
      // ReOrderArray
      const newOrder = [...state.listOrder];
      const [moved] = newOrder.splice(srcIdx, 1);
      newOrder.splice(dstIdx, 0, moved);
      state.listOrder = newOrder;
      renderBoard(); // ReRenderFullBoard
      bindDragEvents(); // RebindDragEvents
    }
    return;
  }

  // MoveCard
  const { cardId, listId: srcListId } = dragState;
  if (!cardId || !srcListId) return;

  const zone = e.currentTarget;
  const afterEl = getDragAfterCard(zone, e.clientY); // WhereToInsert

  // RemoveCardFromSourceList
  const srcList = state.lists[srcListId];
  srcList.cardIds = srcList.cardIds.filter(id => id !== cardId);

  // InsertAtCorrectPositionInDestination
  const dstList = state.lists[destListId];
  if (afterEl) {
    const afterIdx = dstList.cardIds.indexOf(afterEl.dataset.cardId);
    if (afterIdx >= 0) {
      dstList.cardIds.splice(afterIdx, 0, cardId); // AtSpecificPosition
    } else {
      dstList.cardIds.push(cardId); // AtEnd
    }
  } else {
    dstList.cardIds.push(cardId); // AddToEnd
  }

  // DOMUpdate
  const cardEl = document.getElementById('card-' + cardId);
  if (cardEl) {
    cardEl.dataset.listId = destListId; // UpdateList
    if (afterEl) {
      zone.insertBefore(cardEl, afterEl); // AtSpecificPosition
    } else {
      zone.appendChild(cardEl); // AtEnd
    }
  }

  updateListCount(srcListId); // UpdateSourceCount
  updateListCount(destListId); // UpdateDestCount

  saveBoard();
}

//GetDragAfterCard
function getDragAfterCard(container, y) {
  const draggableCards = [
    ...container.querySelectorAll('.card:not(.dragging)'),
  ];
  let closestCard = null;
  let closestOffset = -Infinity;

  draggableCards.forEach(card => {
    const box = card.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestCard = card;
    }
  });
  return closestCard;
}

// ClearDragHighlights
function clearDragHighlights() {
  document
    .querySelectorAll('.drag-over-card')
    .forEach(c => c.classList.remove('drag-over-card'));
  document
    .querySelectorAll('.drag-over-list')
    .forEach(l => l.classList.remove('drag-over-list'));
}

// HandleShowAddCard
function showAddCard(listId) {
  document.getElementById('addBtn-' + listId).classList.add('hidden');
  document.getElementById('addForm-' + listId).classList.remove('hidden');
  const inp = document.getElementById('addInput-' + listId);
  inp.value = '';
  inp.focus();
}

// HandleHideAddCard
function hideAddCard(listId) {
  document.getElementById('addBtn-' + listId).classList.remove('hidden');
  document.getElementById('addForm-' + listId).classList.add('hidden');
}

// HandleAddCardKey
function handleAddCardKey(e, listId) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitAddCard(listId);
  }
  if (e.key === 'Escape') hideAddCard(listId);
}

// CreateNewCard
function submitAddCard(listId) {
  const inp = document.getElementById('addInput-' + listId);
  const title = inp.value.trim();

  if (!title) return;

  const card = {
    id: uid(),
    title,
    description: '',
    labels: [],
    dueDate: null,
    checklist: [],
    coverColor: null,
  };

  state.cards[card.id] = card;
  state.lists[listId].cardIds.push(card.id);

  const zone = document.getElementById('cards-' + listId);
  const tmp = document.createElement('div');
  tmp.innerHTML = buildCardHtml(card, listId);
  const newEl = tmp.firstElementChild;
  zone.appendChild(newEl);
  bindCardDragEvents(newEl);
  updateListCount(listId);
  hideAddCard(listId);

  saveBoard();
}

// DeleteCard
function deleteCard(cardId, listId) {
  if (!confirm('Delete this card?')) return;

  delete state.cards[cardId];

  state.lists[listId].cardIds = state.lists[listId].cardIds.filter(
    id => id !== cardId,
  );

  document.getElementById('card-' + cardId)?.remove();

  updateListCount(listId);

  saveBoard();
}

// UpdateListTitle
function updateListTitle(listId, value) {
  if (value.trim()) {
    state.lists[listId].title = value.trim();
    saveBoard();
  }
}

// ToggleListMenu
function toggleListMenu(e, listId) {
  e.stopPropagation();
  closeAllDropdowns();
  const btn = e.currentTarget;
  const menu = document.createElement('div');
  menu.className = 'dropdown';
  menu.id = 'listMenu-' + listId;
  menu.style.cssText = 'top:28px;right:0;position:absolute;z-index:200';
  menu.innerHTML = `
    <button class="dropdown-item" onclick="startRenameList('${listId}')">✏️ Edit title</button>
    <div class="dropdown-sep"></div>
    <button class="dropdown-item danger" onclick="deleteList('${listId}')">🗑️ Delete list</button>
  `;
  btn.parentElement.appendChild(menu);
  setTimeout(
    () => document.addEventListener('click', closeAllDropdowns, { once: true }),
    0,
  );
}

// RenameList
function startRenameList(listId) {
  closeAllDropdowns();
  const inp =
    document.querySelector(
      `[data-list-id="${listId}"].list-header .list-title-input`,
    ) ||
    document
      .querySelector(`#cards-${listId}`)
      ?.closest('.list')
      ?.querySelector('.list-title-input');
  if (inp) {
    inp.focus();
    inp.select();
  }
}

// DeleteList
function deleteList(listId) {
  closeAllDropdowns();

  const list = state.lists[listId];

  if (!confirm(`Delete list "${list.title}" and all its cards?`)) return;

  list.cardIds.forEach(cid => delete state.cards[cid]);
  delete state.lists[listId];
  state.listOrder = state.listOrder.filter(id => id !== listId);

  renderBoard();
  bindDragEvents();

  saveBoard();
}

// ShowAddListForm
function showAddList() {
  document.getElementById('showAddListBtn').classList.add('hidden');
  document.getElementById('addListForm').classList.remove('hidden');
  document.getElementById('newListInput').focus();
}

// HideAddListForm
function hideAddList() {
  document.getElementById('showAddListBtn').classList.remove('hidden');
  document.getElementById('addListForm').classList.add('hidden');
  document.getElementById('newListInput').value = '';
}

// SubmitAddListForm
function submitAddList() {
  const inp = document.getElementById('newListInput');
  const title = inp.value.trim();

  if (!title) return;

  const id = uid();

  state.lists[id] = {
    id,
    title,
    cardIds: [],
  };

  state.listOrder.push(id);

  renderBoard();
  bindDragEvents();
  hideAddList();

  saveBoard();
}

document
  .getElementById('showAddListBtn')
  .addEventListener('click', showAddList);
document.getElementById('newListInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitAddList();
  if (e.key === 'Escape') hideAddList();
});

let modalCardId = null;

// HandleOpenModal
function openModal(cardId) {
  modalCardId = cardId;
  const card = state.cards[cardId];
  if (!card) return;

  const listId = state.listOrder.find(lid =>
    state.lists[lid]?.cardIds.includes(cardId),
  );
  const listTitle = listId ? state.lists[listId].title : 'Unknown';

  // ModalCover
  const coverEl = document.getElementById('modalCover');
  if (card.coverColor) {
    coverEl.style.background = card.coverColor;
    coverEl.classList.remove('hidden');
  } else {
    coverEl.classList.add('hidden');
  }

  // ModalTitle
  const titleInp = document.getElementById('modalTitle');
  titleInp.value = card.title;
  autoResize(titleInp);

  // ListTag
  document.getElementById('modalListTag').textContent = '' + listTitle;

  // Description
  renderModalDesc(card);

  // Labels
  renderModalLabels(card);

  // Checklist
  renderModalChecklist(card);

  // DueDate
  renderModalDueDate(card);

  // ShowModal
  document.getElementById('cardModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // LockScroll
}

// HandleCloseModal
function closeModal() {
  // SaveTitleBeforeClosing
  if (modalCardId) {
    const t = document.getElementById('modalTitle').value.trim();
    if (t) {
      state.cards[modalCardId].title = t;
      refreshCard(modalCardId); // UpdateCardDOM
    }
  }
  document.getElementById('cardModal').classList.add('hidden');
  document.body.style.overflow = '';
  modalCardId = null;
}

// CloseOnOverlayClick
function handleModalOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

// RenderDescription
function renderModalDesc(card) {
  const view = document.getElementById('descView');
  const textEl = document.getElementById('descText');
  if (card.description) {
    textEl.style.fontStyle = '';
    textEl.style.color = '';
    textEl.textContent = card.description;
  } else {
    textEl.style.fontStyle = 'italic';
    textEl.style.color = 'var(--text3)';
    textEl.textContent = 'Add a more detailed description…';
  }
  document.getElementById('descEdit').value = card.description || '';
  view.classList.remove('hidden');
  document.getElementById('descEdit').classList.add('hidden');
  document.getElementById('descBtns').classList.add('hidden');
}

// StartEditingDescription
function startEditDesc() {
  document.getElementById('descView').classList.add('hidden');
  const ta = document.getElementById('descEdit');
  ta.classList.remove('hidden');
  document.getElementById('descBtns').classList.remove('hidden');
  ta.focus();
  autoResize(ta);
}

// SaveDescription
function saveDesc() {
  if (!modalCardId) return;

  const val = document.getElementById('descEdit').value.trim();

  state.cards[modalCardId].description = val;

  renderModalDesc(state.cards[modalCardId]);

  refreshCard(modalCardId);

  saveBoard();
}

// CancelDescription
function cancelDesc() {
  if (modalCardId) renderModalDesc(state.cards[modalCardId]);
}

// RenderLabelsInModal
function renderModalLabels(card) {
  const section = document.getElementById('modalLabelsSection');
  const display = document.getElementById('modalLabelsDisplay');
  const activeLabels = (card.labels || [])
    .map(id => LABELS.find(l => l.id === id))
    .filter(Boolean);
  if (activeLabels.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = '';
  display.innerHTML = activeLabels
    .map(
      l =>
        `<span class="label-chip" style="background:${l.color}">${l.name}</span>`,
    )
    .join('');
}

// ToggleLabelPicker
function toggleLabelPicker() {
  closeAllDropdowns();
  const panel = document.getElementById('labelPickerPanel');
  if (panel.classList.contains('hidden')) {
    renderLabelPicker();
    panel.classList.remove('hidden');
    setTimeout(
      () =>
        document.addEventListener('click', closeAllDropdowns, { once: true }),
      0,
    );
  } else {
    panel.classList.add('hidden');
  }
}

// RenderLabelPicker
function renderLabelPicker() {
  const card = state.cards[modalCardId];
  document.getElementById('labelPickerList').innerHTML = LABELS.map(
    l => `
    <div onclick="toggleLabel('${l.id}')" style="display:flex;align-items:center;gap:8px;padding:5px 4px;border-radius:7px;cursor:pointer;transition:.1s"
      onmouseover="this.style.background='var(--bg4)'" onmouseout="this.style.background='transparent'">
      <span style="flex:1;height:28px;border-radius:6px;background:${l.color};display:flex;align-items:center;padding:0 10px;font-size:.75rem;font-weight:700;color:white">${l.name}</span>
      <span style="font-size:14px;color:var(--green)">${(card.labels || []).includes(l.id) ? '✓' : ''}</span>
    </div>
  `,
  ).join('');
}

// ToggleLabel
function toggleLabel(labelId) {
  const card = state.cards[modalCardId];

  const set = new Set(card.labels || []);

  set.has(labelId) ? set.delete(labelId) : set.add(labelId);

  card.labels = [...set];

  renderModalLabels(card);

  renderLabelPicker();

  refreshCard(modalCardId);

  saveBoard();
}

// RenderChecklist
function renderModalChecklist(card) {
  const items = card.checklist || [];
  const total = items.length;
  const done = items.filter(i => i.done).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  // Progress
  const bar = document.getElementById('checkProgressBar');
  const fill = document.getElementById('checkProgressFill');
  const pctEl = document.getElementById('checkPct');

  if (total > 0) {
    bar.style.display = '';
    pctEl.style.display = '';
    fill.style.width = pct + '%';
    fill.className = 'check-progress-fill' + (pct === 100 ? ' done' : '');
    pctEl.textContent = pct + '%';
    pctEl.className =
      'check-pct ' + (pct === 100 ? 'badge-green' : 'badge-gray');
  } else {
    bar.style.display = 'none';
    pctEl.style.display = 'none';
  }

  // ItemList
  document.getElementById('checklistItems').innerHTML = items
    .map(
      item => `
    <div class="check-item">
      <div class="checkbox ${item.done ? 'checked' : ''}" onclick="toggleCheck('${item.id}')"></div>
      <span class="check-text ${item.done ? 'done-text' : ''}">${escHtml(item.text)}</span>
      <button class="check-del" onclick="deleteCheckItem('${item.id}')">✕</button>
    </div>
  `,
    )
    .join('');
}

// HandleToggleCheck
function toggleCheck(itemId) {
  const card = state.cards[modalCardId];

  const item = card.checklist.find(i => i.id === itemId);

  if (item) item.done = !item.done;

  renderModalChecklist(card);

  refreshCard(modalCardId);

  saveBoard();
}

// DeleteCheckItem
function deleteCheckItem(itemId) {
  const card = state.cards[modalCardId];

  card.checklist = card.checklist.filter(i => i.id !== itemId);

  renderModalChecklist(card);

  refreshCard(modalCardId);

  saveBoard();
}

// ShowAddCheckItem
function showAddCheckInput() {
  document.getElementById('addCheckForm').classList.remove('hidden');
  document.getElementById('checkItemInput').focus();
}

// HideAddCheckItem
function hideAddCheckInput() {
  document.getElementById('addCheckForm').classList.add('hidden');
  document.getElementById('checkItemInput').value = '';
}

// SubmitAddCheckItem
function submitCheckItem() {
  const inp = document.getElementById('checkItemInput');

  const text = inp.value.trim();

  if (!text) return;

  const card = state.cards[modalCardId];

  card.checklist.push({
    id: uid(),
    text,
    done: false,
  });

  renderModalChecklist(card);

  refreshCard(modalCardId);

  inp.value = '';

  inp.focus();

  saveBoard();
}
document.getElementById('checkItemInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitCheckItem();
  if (e.key === 'Escape') hideAddCheckInput();
});

// RenderModalDueDate
function renderModalDueDate(card) {
  const display = document.getElementById('dueDateDisplay');
  const text = document.getElementById('dueDateText');
  const picker = document.getElementById('dueDatePicker');
  if (card.dueDate) {
    picker.value = card.dueDate;
    const due = new Date(card.dueDate),
      now = new Date(),
      diff = due - now;
    const fmt = due.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const cls =
      diff < 0 ? 'badge-red' : diff < 86400000 ? 'badge-yellow' : 'badge-gray';
    text.textContent = '📅 ' + fmt;
    text.className = 'card-badge ' + cls;
    display.classList.remove('hidden');
  } else {
    picker.value = '';
    display.classList.add('hidden');
  }
}

// SetModalDueDate
function setDueDate(val) {
  if (!modalCardId) return;

  state.cards[modalCardId].dueDate = val || null;

  renderModalDueDate(state.cards[modalCardId]);

  refreshCard(modalCardId);

  saveBoard();
}

// ClearModalDueDate
function clearDueDate() {
  if (!modalCardId) return;

  state.cards[modalCardId].dueDate = null;

  renderModalDueDate(state.cards[modalCardId]);

  refreshCard(modalCardId);

  saveBoard();
}

// ToggleCoverPicker
function toggleCoverPicker() {
  closeAllDropdowns();
  const panel = document.getElementById('coverPickerPanel');
  if (panel.classList.contains('hidden')) {
    renderCoverPicker();
    panel.classList.remove('hidden');
    setTimeout(
      () =>
        document.addEventListener('click', closeAllDropdowns, { once: true }),
      0,
    );
  } else {
    panel.classList.add('hidden');
  }
}

// RenderCoverPicker
function renderCoverPicker() {
  const card = state.cards[modalCardId];
  document.getElementById('coverGrid').innerHTML = COVER_COLORS.map(
    c =>
      `<div class="cover-swatch ${card.coverColor === c ? 'active' : ''}" style="background:${c}" onclick="setCover('${c}')"></div>`,
  ).join('');
  document.getElementById('removeCoverBtn').style.display = card.coverColor
    ? ''
    : 'none';
}

// SetCover
function setCover(color) {
  if (!modalCardId) return;

  state.cards[modalCardId].coverColor = color;

  const coverEl = document.getElementById('modalCover');

  coverEl.style.background = color;

  coverEl.classList.remove('hidden');

  refreshCard(modalCardId);

  renderCoverPicker();

  saveBoard();
}

// RemoveCover
function removeCover() {
  if (!modalCardId) return;

  state.cards[modalCardId].coverColor = null;

  document.getElementById('modalCover').classList.add('hidden');

  refreshCard(modalCardId);

  document.getElementById('coverPickerPanel').classList.add('hidden');

  saveBoard();
}

// DeleteCardFromModal
function deleteCurrentCard() {
  if (!modalCardId) return;

  const confirmed = confirm('Delete this card?');
  if (!confirmed) return;

  // FindTheList
  const listId = state.listOrder.find(lid =>
    state.lists[lid]?.cardIds.includes(modalCardId),
  );

  if (listId) {
    // RemoveCardIDFromList
    state.lists[listId].cardIds = state.lists[listId].cardIds.filter(
      id => id !== modalCardId,
    );

    // RemoveCardElementFromDOM
    const cardEl = document.getElementById(`card-${modalCardId}`);
    if (cardEl) cardEl.remove();

    updateListCount(listId);
  }

  // RemoveCardData
  delete state.cards[modalCardId];

  // ResetModalCard
  modalCardId = null;

  // CloseModal
  closeModal();

  // SaveStateIfNeeded
  saveBoard?.();
}

// AutoSaveModalTitle
document.getElementById('modalTitle').addEventListener('input', function () {
  autoResize(this);
  if (modalCardId) {
    const t = this.value.trim();
    if (t) state.cards[modalCardId].title = t;
  }
});
document.getElementById('modalTitle').addEventListener('blur', function () {
  if (modalCardId) refreshCard(modalCardId);
});

// BoardTitle
document
  .getElementById('boardTitleInput')
  .addEventListener('change', function () {
    state.boardTitle = this.value.trim() || state.boardTitle;
    this.value = state.boardTitle;

    saveBoard();
  });

// Notification
const NOTIFS = [
  {
    msg: 'Create Your TaskFlow Board',
    time: '1m ago',
    color: 'var(--brand)',
  },
  {
    msg: 'Set Due Dates & Reminders',
    time: '1m ago',
    color: 'var(--yellow)',
  },
  {
    msg: 'Organize Tasks with Labels',
    time: '1m ago',
    color: 'var(--green)',
  },
];
document.getElementById('notifList').innerHTML = NOTIFS.map(
  n => `
  <div style="display:flex;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border);cursor:pointer;transition:.1s"
    onmouseover="this.style.background='var(--bg4)'" onmouseout="this.style.background='transparent'">
    <div style="width:7px;height:7px;border-radius:50%;background:${n.color};margin-top:5px;flex-shrink:0"></div>
    <div>
      <p style="font-size:.78rem;color:var(--text2)">${n.msg}</p>
      <p style="font-size:.7rem;color:var(--text3);margin-top:2px">${n.time}</p>
    </div>
  </div>
`,
).join('');

const notifBtn = document.getElementById('notifBtn');
notifBtn.addEventListener('click', e => {
  e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  if (panel.classList.contains('hidden')) {
    closeAllDropdowns();
    panel.classList.remove('hidden');
    setTimeout(
      () =>
        document.addEventListener('click', closeAllDropdowns, { once: true }),
      0,
    );
  } else {
    panel.classList.add('hidden');
  }
});
function closeNotif() {
  document.getElementById('notifPanel').classList.add('hidden');
}

// HTMLEscapeToPreventXSS
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// AutoResizeTextarea
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// CloseAllDropdowns
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown').forEach(d => {
    if (d.id !== 'notifPanel') d.classList.add('hidden');
  });
  // RemoveDynamicallyCreatedMenus
  document.querySelectorAll('[id^="listMenu-"]').forEach(m => m.remove());
}

// EscapeKey
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeAllDropdowns();
  }
});

// Init - AppStart
loadBoard();

renderBoard(); // RenderBoard
bindDragEvents(); // BindDragEvents

// Reset Board To Default
function resetBoard(event) {
  event.preventDefault();

  const confirmed = confirm(
    'Reset board to default and remove all saved data?',
  );

  if (!confirmed) return;

  // Remove saved board
  localStorage.removeItem(STORAGE_KEY);

  // Reload page
  location.reload();
}
