window.onload = () => generateCalendar();

function generateCalendar() {
  const calendarContainer = document.getElementById("calendar");
  const table = document.createElement("table");
  calendarContainer.appendChild(table);

  const headerRow = table.insertRow();
  headerRow.insertCell(); // Empty cell for month names

  for (let year = 2024; year <= 2026; year++) {
    let yearHeader = headerRow.insertCell();
    yearHeader.innerText = year;
    yearHeader.classList.add("year-header");
  }

  for (let month = 1; month <= 12; month++) {
    let monthRow = table.insertRow();
    let monthNameCell = monthRow.insertCell();
    monthNameCell.innerText = getMonthName(month);
    monthNameCell.classList.add("month-name");

    for (let year = 2024; year <= 2026; year++) {
      let monthCell = monthRow.insertCell();
      monthCell.classList.add("label-cell");

      let contentEditable = createEditableCell(year, month);
      monthCell.appendChild(contentEditable);

      let savedLabel = localStorage.getItem(`label-${year}-${getMonthName(month)}`);
      if (savedLabel) contentEditable.innerText = savedLabel;

      let saveIcon = createSaveIcon(contentEditable, year, month);
      monthCell.appendChild(saveIcon);
    }
  }
}

function createEditableCell(year, month) {
  let contentEditable = document.createElement("span");
  contentEditable.contentEditable = true;
  contentEditable.classList.add("editable-month-label");
  contentEditable.dataset.year = year;
  contentEditable.dataset.month = getMonthName(month);
  contentEditable.onblur = () => saveLabel(contentEditable.innerText, year, getMonthName(month));
  contentEditable.onkeydown = (e) => handleKeyDown(e, contentEditable);
  return contentEditable;
}

function handleKeyDown(e, element) {
  if (e.key === "Enter") {
    e.preventDefault();
    let nextCell = element.parentElement.nextElementSibling;
    let nextEditable = nextCell?.querySelector('.editable-month-label');
    nextEditable?.focus();
  }
}

function createSaveIcon(editable, year, month) {
  let saveIcon = document.createElement("i");
  saveIcon.classList.add("far", "fa-cloud", "save-icon");
  saveIcon.onclick = () => {
    saveLabel(editable.innerText, year, getMonthName(month), () => {
      saveIcon.classList.replace("fa-cloud", "fa-check");
      showSavedNotification();
      setTimeout(() => saveIcon.classList.replace("fa-check", "fa-cloud"), 2000);
    });
  };
  return saveIcon;
}

function saveLabel(labelText, year, month, callback) {
  localStorage.setItem(`label-${year}-${month}`, labelText);
  callback?.();
}

function getMonthName(monthNumber) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthNumber - 1];
}

function saveLabel(labelText, year, month, callback) {
    localStorage.setItem(`label-${year}-${month}`, labelText);
    showSavedIcon(year, month);
    if (callback) callback();
}

function showSavedIcon(year, month) {
    let saveIcon = document.querySelector(`.label-cell[data-year="${year}"][data-month="${month}"] .save-icon`);
    saveIcon.classList.replace("fa-cloud", "fa-check");
    setTimeout(() => saveIcon.classList.replace("fa-check", "fa-cloud"), 2000);
}

function showSavedNotification() {
    let notification = document.getElementById("saved-notification");
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 2000);
}



function handleKeyDown(e, element) {
    if (e.key === "Enter") {
        if (e.shiftKey) {
            // Insert a line break if Shift + Enter is pressed
            document.execCommand('insertHTML', false, '<br><br>');
            e.preventDefault();
        } else {
            // Move to the next cell if only Enter is pressed
            e.preventDefault();
            let nextCell = element.parentElement.nextElementSibling;
            let nextEditable = nextCell?.querySelector('.editable-month-label');
            nextEditable?.focus();
        }
    }
}

