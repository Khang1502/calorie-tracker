const foodData = {
  "cơm trắng": { cal:130, carb:28, protein:2.7, fat:0.3 },
  "trứng gà luộc": { cal:155, carb:1.1, protein:13, fat:11 },
  "ức gà": { cal:165, carb:0, protein:31, fat:3.6 },
  "cá": { cal:206, carb:0, protein:22, fat:12 },
  "táo": { cal:52, carb:14, protein:0.3, fat:0.2 },
};

function addFood(){
  const name = document.getElementById('foodName').value.trim().toLowerCase();
  const weight = parseFloat(document.getElementById('weight').value);
  if(!foodData[name]) { alert("Không tìm thấy / Not found"); return; }
  const f = foodData[name];
  const cal = f.cal*weight/100;
  const carb = f.carb*weight/100;
  const protein = f.protein*weight/100;
  const fat = f.fat*weight/100;
  const item = { name, weight, cal, carb, protein, fat };
  let history = JSON.parse(localStorage.getItem('history'))||[];
  history.push(item);
  localStorage.setItem('history', JSON.stringify(history));
  displayHistory(); displayTotals();
}

function displayHistory(){
  const ul = document.getElementById('history'); ul.innerHTML = '';
  let history = JSON.parse(localStorage.getItem('history'))||[];
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (${item.weight}g): ${item.cal.toFixed(1)} kcal, C:${item.carb.toFixed(1)}g P:${item.protein.toFixed(1)}g F:${item.fat.toFixed(1)}g`;
    ul.appendChild(li);
  });
}

function displayTotals(){
  let total = { cal:0, carb:0, protein:0, fat:0 };
  let history = JSON.parse(localStorage.getItem('history'))||[];
  history.forEach(i => {
    total.cal += i.cal; total.carb += i.carb;
    total.protein += i.protein; total.fat += i.fat;
  });
  document.getElementById('totals').textContent =
    `Calories: ${total.cal.toFixed(1)} kcal | Carbs: ${total.carb.toFixed(1)}g | Protein: ${total.protein.toFixed(1)}g | Fat: ${total.fat.toFixed(1)}g`;
}

displayHistory(); displayTotals();
