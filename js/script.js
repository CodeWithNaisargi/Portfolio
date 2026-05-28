/* Typing Animation */
var typed = new Typed(".typing", {
  strings: ["", "Prompt Engineer", "Web Developer", "Artist", "Content Writer"],
  typeSpeed: 100,
  BacksSpeed: 60,
  loop: true,
});

/* Aside */

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
        //allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

/* Contact Form Handling */
function showNotification(message, isSuccess = true) {
  const notif = document.createElement("div");
  notif.innerText = message;
  notif.style.position = "fixed";
  notif.style.top = "20px";
  notif.style.right = "20px";
  notif.style.padding = "15px 25px";
  notif.style.borderRadius = "5px";
  notif.style.color = "#fff";
  notif.style.background = isSuccess ? "var(--skin-color)" : "#dc3545";
  notif.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  notif.style.zIndex = "9999";
  notif.style.transition = "opacity 0.3s ease";
  notif.style.opacity = "0";

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => {
      notif.remove();
    }, 300);
  }, 3000);
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById("contact-submit");
    const originalBtnText = submitBtn.innerText;
    
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const subject = document.getElementById("contact-subject").value;
    const message = document.getElementById("contact-message").value;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const result = await response.json();
      
      if (response.ok) {
        showNotification("Email sent successfully!", true);
        contactForm.reset();
      } else {
        showNotification("Error: " + (result.error || "Failed to send email."), false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification("Error sending email. Please try again later.", false);
    } finally {
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
