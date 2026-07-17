// /js/search.js
let archiveData = [];
let currentRecords = [];

fetch('data/archive.json?v=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    archiveData = data.records;
    currentRecords = archiveData;
    displayMasterList(archiveData);
  })
  .catch(error => {
    console.error('Error loading archive:', error);
    document.getElementById('results').innerHTML = 
      '<p style="color:#ff6b6b;">Could not load archive.json. Check file path.</p>';
  });

function performSearch(searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    currentRecords = archiveData;
    displayMasterList(archiveData);
    return;
  }

  const term = searchTerm.toLowerCase().trim();
  
  const matches = archiveData.filter(record => {
    const nameMatch = record.Person_Name.toLowerCase().includes(term);
    const phoneticMatch = record.Phonetic_Variations.some(variant => 
      variant.toLowerCase().includes(term)
    );
    const markMatch = record.Signature_Mark.toLowerCase().includes(term);
    const sourceMatch = record.Source_ID.toLowerCase().includes(term);
    
    return nameMatch || phoneticMatch || markMatch || sourceMatch;
  });

  currentRecords = matches;
  displayMasterList(matches);
}

function displayMasterList(records) {
  const container = document.getElementById('results');
  
  if (records.length === 0) {
    container.innerHTML = '<p style="color:#888;">No records found.</p>';
    return;
  }

  let html = '<table class="master-table">';
  html += '<tr><th>Date</th><th>Name</th><th>Document Type</th><th>Source</th><th>Mark</th></tr>';
  
  records.forEach(record => {
    html += `<tr onclick="showDetail('${record.Record_ID}')" class="clickable-row">
      <td>${record.Date}</td>
      <td>${record.Person_Name}</td>
      <td>${record.Document_Type}</td>
      <td>${record.Source_ID}</td>
      <td>${record.Signature_Mark}</td>
    </tr>`;
  });
  
  html += '</table>';
  html += `<p class="count">Showing ${records.length} of ${archiveData.length} records</p>`;
  container.innerHTML = html;
}

function showDetail(recordId) {
  const record = archiveData.find(r => r.Record_ID === recordId);
  if (!record) return;

  const detailDiv = document.getElementById('detail-view');
  
  detailDiv.innerHTML = `
    <div class="detail-card">
      <h2>${record.Person_Name} <span class="record-id">[${record.Record_ID}]</span></h2>
      <p class="confidence ${record.Confidence_Level.replace(' ', '-')}">${record.Confidence_Level}</p>
      
      <div class="detail-grid">
        <div><strong>Date:</strong> ${record.Date}</div>
        <div><strong>Document Type:</strong> ${record.Document_Type}</div>
        <div><strong>Source ID:</strong> ${record.Source_ID}</div>
        <div><strong>Signature Mark:</strong> ${record.Signature_Mark}</div>
        ${record.Land_Deed_Location ? `<div><strong>Location:</strong> ${record.Land_Deed_Location}</div>` : ''}
      </div>
      
      <div class="phonetic-box">
        <strong>Phonetic Variations Recorded:</strong>
        <ul>${record.Phonetic_Variations.map(v => `<li>${v}</li>`).join('')}</ul>
      </div>
      
      <div class="notes-box">
        <strong>Transcript / Notes:</strong>
        <p>${record.Transcript_Notes}</p>
      </div>
      
      <button onclick="closeDetail()" class="close-btn">Close Detail View</button>
    </div>
  `;
  
  detailDiv.style.display = 'block';
  document.getElementById('results').style.display = 'none';
}

function closeDetail() {
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('results').style.display = 'block';
}
