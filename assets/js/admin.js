const API_AIRCRAFT = '/api/admin/manage_aircraft.php';
const API_FLIGHTS  = '/api/admin/manage_flights.php';
const API_BOOKS    = '/api/admin/view_bookings.php';

document.addEventListener('DOMContentLoaded',()=>{
  // Load data based on page
  if (location.pathname.includes('manage-aircraft.html')) initAircraft();
  if (location.pathname.includes('manage-flights.html'))  initFlights();
  if (location.pathname.includes('view-bookings.html'))  loadBookings();
});

// -------------------- Aircraft --------------------
function initAircraft(){
  const f = document.getElementById('aircraftForm');
  loadAircraft();
  f.onsubmit = e=>{
    e.preventDefault();
    const payload = {
      id:      f.id.value||undefined,
      model:   f.model.value,
      total_seats:+f.total_seats.value,
      seat_config: JSON.parse(f.seat_config.value)
    };
    const method = f.id.value?'PUT':'POST';
    fetch(API_AIRCRAFT,{method,body:JSON.stringify(payload)})
      .then(r=>r.json()).then(()=>{f.reset();loadAircraft();});
  };
  document.getElementById('aircraftReset').onclick = ()=>f.reset();
}

function loadAircraft(){
  fetch(API_AIRCRAFT).then(r=>r.json()).then(data=>{
    const tb=document.querySelector('#aircraftTable tbody');
    tb.innerHTML='';
    data.forEach(a=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td>${a.id}</td>
        <td>${a.model}</td>
        <td>${a.total_seats}</td>
        <td>${JSON.stringify(a.seat_config)}</td>
        <td>
          <button onclick="editAircraft(${a.id})">Edit</button>
          <button onclick="delAircraft(${a.id})">Delete</button>
        </td>`;
      tb.appendChild(tr);
    });
  });
}

function editAircraft(id){
  fetch(API_AIRCRAFT).then(r=>r.json()).then(data=>{
    const a = data.find(x=>x.id===id);
    Object.assign(document.getElementById('aircraftForm'), {
      id:{value:a.id},model:{value:a.model},
      total_seats:{value:a.total_seats},
      seat_config:{value:JSON.stringify(a.seat_config)}
    });
  });
}

function delAircraft(id){
  if(!confirm('Delete?'))return;
  fetch(API_AIRCRAFT,{method:'DELETE',body:JSON.stringify({id})})
    .then(()=>loadAircraft());
}

// -------------------- Flights --------------------
function initFlights(){
  const f = document.getElementById('flightForm');
  loadAircraftOptions();
  loadFlightsTable();
  f.onsubmit = e=>{
    e.preventDefault();
    const payload = {
      flight_id: +f.flight_id.value||undefined,
      flight_number: f.flight_number.value,
      origin: f.origin.value,
      destination: f.destination.value,
      departure_time: f.departure_time.value,
      arrival_time: f.arrival_time.value,
      available_seats: +f.available_seats.value,
      aircraft_id: +f.aircraft_id.value,
      seat_prices: JSON.parse(f.seat_prices.value)
    };
    const method = f.flight_id.value?'PUT':'POST';
    fetch(API_FLIGHTS,{method,body:JSON.stringify(payload)})
      .then(()=>{f.reset();loadFlightsTable();});
  };
  document.getElementById('flightReset').onclick = ()=>f.reset();
}

function loadAircraftOptions(){
  fetch(API_AIRCRAFT).then(r=>r.json()).then(data=>{
    const sel = document.getElementById('flightAircraft');
    sel.innerHTML = '<option value="">--select--</option>';
    data.forEach(a=>{
      sel.innerHTML += `<option value="${a.id}">${a.model}</option>`;
    });
  });
}

function loadFlightsTable(){
  fetch(API_FLIGHTS).then(r=>r.json()).then(data=>{
    const tb=document.querySelector('#flightsTable tbody');
    tb.innerHTML='';
    data.forEach(f=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td>${f.flight_id}</td>
        <td>${f.flight_number}</td>
        <td>${f.origin}→${f.destination}</td>
        <td>${f.departure_time}<br>${f.arrival_time}</td>
        <td>${f.available_seats}</td>
        <td>${f.aircraft_model||''}</td>
        <td>
          <button onclick="editFlight(${f.flight_id})">Edit</button>
          <button onclick="delFlight(${f.flight_id})">Delete</button>
        </td>`;
      tb.appendChild(tr);
    });
  });
}

function editFlight(id){
  fetch(API_FLIGHTS).then(r=>r.json()).then(data=>{
    const fdata = data.find(x=>x.flight_id===id);
    const f = document.getElementById('flightForm');
    Object.assign(f,{
      flight_id:{value:fdata.flight_id},
      flight_number:{value:fdata.flight_number},
      origin:{value:fdata.origin},
      destination:{value:fdata.destination},
      departure_time:{value:fdata.departure_time.replace(' ','T')},
      arrival_time:{value:fdata.arrival_time.replace(' ','T')},
      available_seats:{value:fdata.available_seats},
      aircraft_id:{value:fdata.aircraft_id||''},
      seat_prices:{value:JSON.stringify(fdata.seat_prices)}
    });
  });
}

function delFlight(id){
  if(!confirm('Delete?'))return;
  fetch(API_FLIGHTS,{method:'DELETE',body:JSON.stringify({flight_id:id})})
    .then(()=>loadFlightsTable());
}

// -------------------- View Bookings --------------------
function loadBookings(){
  fetch(API_BOOKS).then(r=>r.json()).then(data=>{
    const tb=document.querySelector('#bookingsTable tbody');
    tb.innerHTML='';
    data.forEach(b=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td>${b.reservation_id}</td>
        <td>${b.username}</td>
        <td>${b.email}</td>
        <td>${b.flight_number}</td>
        <td>${b.origin}→${b.destination}</td>
        <td>${b.departure_time}</td>`;
      tb.appendChild(tr);
    });
  });
}
