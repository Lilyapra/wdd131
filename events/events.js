// ── Element references ──
const typeEl     = document.getElementById('type');
const extraField = document.getElementById('extra-field');
const extraLabel = document.getElementById('extra-label');
const extraInput = document.getElementById('extra-input');

// ── Show / hide extra field when type changes ──
typeEl.addEventListener('change', function () {
  var val = this.value;

  if (!val) {
    extraField.classList.remove('show');
    extraInput.value = '';
    extraInput.classList.remove('err');
    return;
  }

  extraField.classList.add('show');
  extraInput.value = '';
  extraInput.classList.remove('err');

  if (val === 'student') {
    extraLabel.textContent = 'Student I#';
    extraInput.placeholder = 'Enter your 9-digit student ID number';
    extraInput.maxLength   = 9;
    extraInput.inputMode   = 'numeric';
  } else {
    extraLabel.textContent = 'Access Code';
    extraInput.placeholder = 'Enter your event access code';
    extraInput.maxLength   = 20;
    extraInput.inputMode   = 'text';
  }
});

// ── Clear all error states ──
function clearErrors() {
  ['fname', 'lname', 'email', 'type', 'edate'].forEach(function (id) {
    document.getElementById(id).classList.remove('err');
  });
  extraInput.classList.remove('err');
  document.getElementById('errors').innerHTML = '';
  document.getElementById('ticket-out').classList.remove('show');
}

// ── Form submission ──
function submitForm() {
  clearErrors();

  var fname = document.getElementById('fname').value.trim();
  var lname = document.getElementById('lname').value.trim();
  var email = document.getElementById('email').value.trim();
  var type  = typeEl.value;
  var edate = document.getElementById('edate').value;
  var extra = extraInput.value.trim();

  var errors = [];

  if (!fname) {
    errors.push('First name is required.');
    document.getElementById('fname').classList.add('err');
  }
  if (!lname) {
    errors.push('Last name is required.');
    document.getElementById('lname').classList.add('err');
  }
  if (!email) {
    errors.push('Email address is required.');
    document.getElementById('email').classList.add('err');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address.');
    document.getElementById('email').classList.add('err');
  }
  if (!type) {
    errors.push('Please select a ticket type (Student or Guest).');
    document.getElementById('type').classList.add('err');
  }
  if (!edate) {
    errors.push('Event date is required.');
    document.getElementById('edate').classList.add('err');
  }

  if (type === 'student') {
    if (!extra) {
      errors.push('Student I# is required.');
      extraInput.classList.add('err');
    } else if (!/^\d{9}$/.test(extra)) {
      errors.push('Student I# must be exactly 9 digits (numbers only).');
      extraInput.classList.add('err');
    }
  }
  if (type === 'guest') {
    if (!extra) {
      errors.push('Access code is required.');
      extraInput.classList.add('err');
    } else if (extra.toUpperCase() !== 'EVENT131') {
      errors.push('Access code is incorrect. Please check and try again.');
      extraInput.classList.add('err');
    }
  }

  // ── Show errors and stop if any ──
  if (errors.length > 0) {
    var items = errors.map(function (msg) {
      return '<li>' + msg + '</li>';
    }).join('');
    document.getElementById('errors').innerHTML =
      '<div class="err-box"><ul>' + items + '</ul></div>';
    return;
  }

  // ── All valid — build ticket ──
  document.getElementById('t-name').textContent = fname + ' ' + lname;
  document.getElementById('t-type').textContent = type;
  document.getElementById('t-date').textContent = edate;

  var ticketOut = document.getElementById('ticket-out');
  ticketOut.classList.add('show');
  ticketOut.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}