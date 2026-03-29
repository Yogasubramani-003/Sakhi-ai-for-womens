// State for period tracking
let awaitingPeriodDate = false;
let awaitingCycleLength = false;
let lastPeriodDate = null;

function quickAsk(topic) {
  addMessage(topic, 'user');
  setTimeout(() => respond(topic), 500);
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMessage(text, 'user');
  showTyping();
  setTimeout(() => {
    removeTyping();
    respond(text);
  }, 800);
}

function addMessage(text, sender) {
  const chatWindow = document.getElementById('chatWindow');
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  const avatar = sender === 'bot' ? '🌸' : '👤';
  msg.innerHTML = `
    <div class="avatar">${avatar}</div>
    <div class="bubble">${text}</div>
  `;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTyping() {
  const chatWindow = document.getElementById('chatWindow');
  const msg = document.createElement('div');
  msg.className = 'message bot typing';
  msg.id = 'typingIndicator';
  msg.innerHTML = `<div class="avatar">🌸</div><div class="bubble">typing...</div>`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function respond(text) {
  const lower = text.toLowerCase();

  // Period tracking flow
  if (awaitingCycleLength) {
    awaitingCycleLength = false;
    const days = parseInt(text);
    const cycleLen = isNaN(days) ? 28 : days;
    const next = new Date(lastPeriodDate);
    next.setDate(next.getDate() + cycleLen);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    addMessage(
      `Got it! 🗓️ Based on your last period and a <strong>${cycleLen}-day cycle</strong>, your next expected period is around:<br/><br/>
      <strong style="color:#c2185b; font-size:1.1rem;">📅 ${next.toLocaleDateString('en-US', options)}</strong><br/><br/>
      <span class="warning">⚠️ This is an estimate. Cycles can vary. Consult a doctor if your periods are very irregular.</span>`,
      'bot'
    );
    return;
  }

  if (awaitingPeriodDate) {
    const date = new Date(text);
    if (isNaN(date.getTime())) {
      addMessage("I couldn't read that date. Please enter it in this format: <strong>YYYY-MM-DD</strong> (e.g. 2025-03-01)", 'bot');
      return;
    }
    lastPeriodDate = date;
    awaitingPeriodDate = false;
    awaitingCycleLength = true;
    addMessage("Thanks! 😊 Now, what is your usual cycle length in days? (Press Enter or type <strong>28</strong> for the default)", 'bot');
    return;
  }

  // Topic matching
  if (lower.includes('period track') || lower.includes('next period') || lower.includes('cycle')) {
    awaitingPeriodDate = true;
    addMessage("Sure! Let's track your period. 🩸<br/><br/>Please enter your <strong>last period start date</strong> in this format:<br/><strong>YYYY-MM-DD</strong> (e.g. 2025-03-01)", 'bot');
  }
  else if (lower.includes('pain') || lower.includes('cramp') || lower.includes('relief')) {
    addMessage(getPainRelief(), 'bot');
  }
  else if (lower.includes('pregnan') || lower.includes('nutrition') || lower.includes('food')) {
    addMessage(getPregnancyNutrition(), 'bot');
  }
  else if (lower.includes('water') || lower.includes('hydrat') || lower.includes('drink')) {
    addMessage(getWaterIntake(), 'bot');
  }
  else if (lower.includes('pcos') || lower.includes('pcod')) {
    addMessage(getPCOS(), 'bot');
  }
  else if (lower.includes('yoga') || lower.includes('exercise') || lower.includes('pose') || lower.includes('stretch')) {
    addMessage(getYoga(), 'bot');
  }
  else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
    addMessage("Hello! 👋 Welcome to <strong>Sakhi AI</strong>. How can I help you today? You can ask me about periods, pain relief, pregnancy, PCOS, yoga, or water intake 😊", 'bot');
  }
  else {
    addMessage("I'm here to help with women's health topics 😊<br/><br/>You can ask me about:<br/>🩸 Period tracking &nbsp;|&nbsp; 💊 Pain relief<br/>🤰 Pregnancy nutrition &nbsp;|&nbsp; 💧 Water intake<br/>🔬 PCOD/PCOS &nbsp;|&nbsp; 🧘 Yoga & exercises<br/><br/>What would you like to know?", 'bot');
  }
}

function getPainRelief() {
  return `Here are simple home remedies for period pain relief 💊🌿<br/><br/>
  <span class="section-title">🔥 1. Heat Therapy</span>
  <ul>
    <li>Place a warm heating pad on your lower belly</li>
    <li>Keep it for 15–20 minutes, 2–3 times a day</li>
    <li>Relaxes muscles and reduces cramping</li>
  </ul>
  <span class="section-title">💧 2. Stay Hydrated</span>
  <ul>
    <li>Drink 8–10 glasses of warm water daily</li>
    <li>Try warm lemon water in the morning</li>
    <li>Avoid cold drinks — they can worsen cramps</li>
  </ul>
  <span class="section-title">🍵 3. Herbal Teas</span>
  <ul>
    <li>Ginger tea — reduces inflammation</li>
    <li>Chamomile tea — relaxes muscles</li>
    <li>Cinnamon tea — helps with cramps and bloating</li>
  </ul>
  <span class="section-title">🧘 4. Light Exercise</span>
  <ul>
    <li>Gentle walking for 10–15 minutes</li>
    <li>Child's Pose yoga helps relieve cramps</li>
  </ul>
  <span class="section-title">🥗 5. Eat Right</span>
  <ul>
    <li>Eat bananas, leafy greens, and nuts</li>
    <li>Avoid salty, spicy, and processed foods</li>
    <li>Reduce caffeine and sugar during periods</li>
  </ul>
  <div class="warning">⚠️ If pain is very severe or unusual, please consult a doctor.</div>`;
}

function getPregnancyNutrition() {
  return `Here are healthy foods for pregnancy 🤰🥗<br/><br/>
  <span class="section-title">🥬 Iron-Rich Foods</span>
  <ul>
    <li>Spinach, lentils, beans, tofu</li>
    <li>Lean meat and eggs</li>
    <li>Helps prevent anemia during pregnancy</li>
  </ul>
  <span class="section-title">🥛 Calcium-Rich Foods</span>
  <ul>
    <li>Milk, yogurt, cheese</li>
    <li>Almonds and sesame seeds</li>
    <li>Builds strong bones for baby</li>
  </ul>
  <span class="section-title">🍎 Fruits & Vegetables</span>
  <ul>
    <li>Bananas, oranges, berries, mangoes</li>
    <li>Carrots, sweet potatoes, broccoli</li>
    <li>Rich in vitamins and antioxidants</li>
  </ul>
  <span class="section-title">🌾 Whole Grains</span>
  <ul>
    <li>Brown rice, oats, whole wheat bread</li>
    <li>Provides energy and fiber</li>
  </ul>
  <span class="section-title">💧 Stay Hydrated</span>
  <ul>
    <li>Drink at least 8–10 glasses of water daily</li>
    <li>Coconut water is also great</li>
  </ul>
  <div class="warning">⚠️ Always follow your doctor's dietary advice during pregnancy.</div>`;
}

function getWaterIntake() {
  return `Here's your daily water intake guide 💧<br/><br/>
  <span class="section-title">📊 General Recommendation</span>
  <ul>
    <li>Drink <strong>2–3 liters</strong> (8–10 glasses) of water daily</li>
    <li>More if you exercise or live in a hot climate</li>
  </ul>
  <span class="section-title">🤰 During Pregnancy</span>
  <ul>
    <li>Aim for <strong>2.5–3 liters</strong> per day</li>
    <li>Helps with digestion and baby development</li>
  </ul>
  <span class="section-title">🩸 During Periods</span>
  <ul>
    <li>Drink warm water to reduce bloating and cramps</li>
    <li>Avoid cold drinks</li>
  </ul>
  <span class="section-title">💡 Tips</span>
  <ul>
    <li>Start your day with a glass of warm water</li>
    <li>Carry a water bottle with you</li>
    <li>Eat water-rich fruits like watermelon and cucumber</li>
  </ul>`;
}

function getPCOS() {
  return `Here's what you need to know about PCOD/PCOS 🔬<br/><br/>
  <span class="section-title">❓ What is PCOS/PCOD?</span>
  <ul>
    <li>A hormonal condition affecting women of reproductive age</li>
    <li>Causes irregular periods, weight gain, acne, and excess hair</li>
    <li>Small cysts may form on the ovaries</li>
  </ul>
  <span class="section-title">🥗 Diet Tips</span>
  <ul>
    <li>Eat more vegetables, fruits, and whole grains</li>
    <li>Avoid sugary and processed foods</li>
    <li>Include anti-inflammatory foods like turmeric and ginger</li>
  </ul>
  <span class="section-title">🏃 Exercise</span>
  <ul>
    <li>Walk 30 minutes daily</li>
    <li>Try yoga — especially Butterfly Pose and Cat-Cow</li>
    <li>Regular exercise helps balance hormones</li>
  </ul>
  <span class="section-title">🧘 Stress Management</span>
  <ul>
    <li>Practice deep breathing or meditation daily</li>
    <li>Get 7–8 hours of sleep</li>
    <li>Reduce screen time before bed</li>
  </ul>
  <div class="warning">⚠️ PCOS needs proper medical diagnosis. Please consult a gynecologist for treatment.</div>`;
}

function getYoga() {
  return `Here are simple yoga poses for women's health 🧘<br/><br/>
  <span class="section-title">1. 🧎 Child's Pose (Balasana)</span>
  <ul>
    <li>Kneel on the floor, sit back on your heels</li>
    <li>Stretch arms forward on the floor</li>
    <li>Rest forehead on the ground</li>
    <li>Hold for 30–60 seconds, breathe deeply</li>
    <li>✅ Relieves cramps and lower back pain</li>
  </ul>
  <span class="section-title">2. 🐄 Cat-Cow Pose (Marjaryasana)</span>
  <ul>
    <li>Get on all fours (hands and knees)</li>
    <li>Inhale — drop belly down, lift head up (Cow)</li>
    <li>Exhale — round back up, tuck chin (Cat)</li>
    <li>Repeat 8–10 times slowly</li>
    <li>✅ Great for period pain and spine flexibility</li>
  </ul>
  <span class="section-title">3. 🦋 Butterfly Pose (Baddha Konasana)</span>
  <ul>
    <li>Sit on floor, bring soles of feet together</li>
    <li>Hold feet with both hands</li>
    <li>Gently flap knees up and down</li>
    <li>Do for 1–2 minutes</li>
    <li>✅ Helps with irregular periods and hip tension</li>
  </ul>
  <span class="section-title">4. 🦵 Legs Up the Wall (Viparita Karani)</span>
  <ul>
    <li>Lie on your back near a wall</li>
    <li>Raise both legs and rest them against the wall</li>
    <li>Keep arms relaxed by your sides</li>
    <li>Stay for 2–5 minutes</li>
    <li>✅ Reduces bloating and fatigue</li>
  </ul>
  <div class="warning">⚠️ Avoid intense exercise on heavy flow days. Stop if anything hurts.</div>`;
}
