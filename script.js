// List of 100 Rice Purity Test statements
const questionsList = [
  "Held hands romantically", "Kissed someone on the lips", "Went on a romantic date", "Had a romantic relationship", "French kissed", 
  "Had a sexual encounter", "Had underage alcohol", "Used marijuana", "Skipped school", "Cheated on a test",
  "Used a fake ID", "Had a one-night stand", "Had sex while drunk/high", "Sent explicit images", "Received explicit images",
  "Engaged in public indecency", "Had sex with someone you just met", "Used recreational drugs", "Been arrested", "Vandalized property",
  "Stole something", "Gambled money", "Lied to parents about whereabouts", "Had friends with benefits", "Participated in a threesome",
  "Used opioids recreationally", "Been to a strip club", "Had sex in a car", "Had oral sex", "Had anal sex",
  "Made a sex tape", "Used psychedelics", "Been diagnosed with STD", "Had an abortion or caused one", "Had sex with a stranger",
  "Had sex for money", "Been involved in a physical fight", "Carried a weapon illegally", "Driven under influence", "Cheated on a partner",
  "Been cheated on", "Had sex with same gender", "Had sex with someone over 10 years older", "Watched porn regularly", "Had sex on first date",
  "Sent sexual messages to a minor", "Used cocaine", "Used meth", "Inhaled solvents", "Took prescription pills recreationally",
  "Joined a hookup app", "Had sex in a dorm", "Had a pregnancy scare", "Had an intimate relationship with professor", "Been to a rave",
  "Shoplifted", "Spent night in jail", "Had sex with a coworker", "Done body modifications without consent", "Used someone else's ID for alcohol",
  "Violated curfew repeatedly", "Lied to get out of trouble", "Had threesome with strangers", "Used heroin", "Overdosed on drugs", "Shared needles",
  "Gave someone an STD", "Knowingly spread an STI", "Had an open relationship", "Been in an orgy", "Had sex with sibling's friend",
  "Used steroids", "Been banned from a venue", "Had restraining order against you", "Engaged in voyeurism", "Exposed yourself to someone",
  "Had sex with an ex while in new relationship", "Broke a bone from partying", "Had intervention from family", "Faked pregnancy", "Used date rape drugs",
  "Committed fraud", "Bribed an official", "Had sex in a church", "Performed sexual act for grade", "Experienced homelessness due to lifestyle",
  "Been in a sex swing", "Used laughing gas", "Attended sex party", "Had sex with more than 2 people in 24h", "Blackmailed someone",
  "Had sugar daddy/mommy", "Stolen from family", "Followed dark web for illegal goods", "Committed assault", "Driven while blackout drunk",
  "Had forced intercourse", "Made revenge porn", "Convicted of a felony", "Sold illegal substances", "Purposely infected someone with disease"
];

// Ensure exactly 100 items
while(questionsList.length < 100) questionsList.push("Additional experience recalled");
const finalQuestions = questionsList.slice(0, 100);

let checkboxesState = new Array(100).fill(false);

function renderQuestions() {
  const container = document.getElementById("questionsContainer");
  if (!container) return;
  container.innerHTML = "";
  
  finalQuestions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "question-item";
    
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = `q_${idx}`;
    cb.checked = checkboxesState[idx];
    cb.addEventListener("change", (e) => {
      checkboxesState[idx] = e.target.checked;
    });
    
    const label = document.createElement("label");
    label.htmlFor = `q_${idx}`;
    label.textContent = q;
    
    div.appendChild(cb);
    div.appendChild(label);
    container.appendChild(div);
  });
}

function calculateScore() {
  const checkedCount = checkboxesState.filter(v => v === true).length;
  const purity = 100 - checkedCount;
  
  const scoreElement = document.getElementById("purityScore");
  const tagElement = document.getElementById("purityTag");
  
  if (scoreElement) scoreElement.innerText = purity;
  
  if (tagElement) {
    if(purity >= 96) tagElement.innerText = "Innocent Spirit";
    else if(purity >= 80) tagElement.innerText = "Mildly Experienced";
    else if(purity >= 60) tagElement.innerText = "Balanced Life";
    else if(purity >= 40) tagElement.innerText = "Worldly & Bold";
    else if(purity >= 20) tagElement.innerText = "Intensely Lived";
    else tagElement.innerText = "Uncharted Territory";
  }
  
  return purity;
}

function resetAll() {
  for(let i = 0; i < checkboxesState.length; i++) {
    checkboxesState[i] = false;
  }
  renderQuestions();
  calculateScore();
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  const anchors = document.querySelectorAll('.toc a');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if(targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  calculateScore();
  initSmoothScroll();
  
  const calculateBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");
  
  if (calculateBtn) calculateBtn.addEventListener("click", calculateScore);
  if (resetBtn) resetBtn.addEventListener("click", resetAll);
});
