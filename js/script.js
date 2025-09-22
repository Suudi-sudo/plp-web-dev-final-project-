// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeStars()
  initializeNavigation()
  initializeFilters()
  initializeContactForm()
  initializeAnimations()
})

// Stars Animation Enhancement
function initializeStars() {
  const starsContainer = document.querySelector(".stars")
  if (!starsContainer) return

  // Add more dynamic stars
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div")
    star.className = "dynamic-star"
    star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
            opacity: ${Math.random() * 0.8 + 0.2};
        `
    starsContainer.appendChild(star)
  }

  // Add twinkle animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `
  document.head.appendChild(style)
}

// Navigation Enhancement
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.style.background = "rgba(34, 197, 94, 0.3)"
      link.style.color = "#4ade80"
    }

    // Add smooth hover effects
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Filter Functionality
function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.textContent.toLowerCase()

      // Filter logic for different pages
      if (document.querySelector(".blog-grid")) {
        filterBlogPosts(filterValue)
      } else if (document.querySelector(".skills-grid")) {
        filterSkills(filterValue)
      }
    })
  })
}

// Blog Filter Function
function filterBlogPosts(filter) {
  const blogCards = document.querySelectorAll(".blog-card")

  blogCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase()
    const content = card.querySelector("p").textContent.toLowerCase()

    let shouldShow = filter === "all"

    if (!shouldShow) {
      switch (filter) {
        case "frontend":
          shouldShow = title.includes("web design") || title.includes("frontend") || content.includes("react")
          break
        case "backend":
          shouldShow = title.includes("backend") || title.includes("scalable") || content.includes("server")
          break
        case "mobile":
          shouldShow = title.includes("mobile") || title.includes("cross-platform")
          break
        case "ai":
          shouldShow = title.includes("ai") || title.includes("artificial intelligence")
          break
      }
    }

    card.style.display = shouldShow ? "block" : "none"
    card.style.animation = shouldShow ? "fadeInUp 0.5s ease-out" : ""
  })
}

// Skills Filter Function
function filterSkills(filter) {
  const skillCategories = document.querySelectorAll(".skills-category")

  skillCategories.forEach((category) => {
    const categoryTitle = category.querySelector("h2").textContent.toLowerCase()
    let shouldShow = filter === "all"

    if (!shouldShow) {
      switch (filter) {
        case "front-end":
          shouldShow = categoryTitle.includes("front-end")
          break
        case "back-end":
          shouldShow = categoryTitle.includes("back-end")
          break
        case "mobile":
          shouldShow = categoryTitle.includes("mobile")
          break
        case "other":
          shouldShow = categoryTitle.includes("other")
          break
      }
    }

    category.style.display = shouldShow ? "block" : "none"
    category.style.animation = shouldShow ? "fadeInUp 0.5s ease-out" : ""
  })
}

// Contact Form Functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Validate form
    if (validateForm(data)) {
      // Simulate form submission
      submitForm(data)
    }
  })

  // Add real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this)
      }
    })
  })
}

// Form Validation
function validateForm(data) {
  let isValid = true
  const form = document.getElementById("contactForm")

  // Clear previous errors
  form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"))
  form.querySelectorAll(".error-message").forEach((el) => el.remove())

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    showFieldError("name", "Name must be at least 2 characters long")
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    showFieldError("email", "Please enter a valid email address")
    isValid = false
  }

  // Validate subject
  if (!data.subject || data.subject.trim().length < 3) {
    showFieldError("subject", "Subject must be at least 3 characters long")
    isValid = false
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    showFieldError("message", "Message must be at least 10 characters long")
    isValid = false
  }

  return isValid
}

// Validate Individual Field
function validateField(field) {
  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  switch (field.name) {
    case "name":
      if (value.length < 2) {
        errorMessage = "Name must be at least 2 characters long"
        isValid = false
      }
      break
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address"
        isValid = false
      }
      break
    case "subject":
      if (value.length < 3) {
        errorMessage = "Subject must be at least 3 characters long"
        isValid = false
      }
      break
    case "message":
      if (value.length < 10) {
        errorMessage = "Message must be at least 10 characters long"
        isValid = false
      }
      break
  }

  if (isValid) {
    field.classList.remove("error")
    const errorEl = field.parentNode.querySelector(".error-message")
    if (errorEl) errorEl.remove()
  } else {
    showFieldError(field.name, errorMessage)
  }

  return isValid
}

// Show Field Error
function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`)
  field.classList.add("error")

  // Remove existing error message
  const existingError = field.parentNode.querySelector(".error-message")
  if (existingError) existingError.remove()

  // Add new error message
  const errorEl = document.createElement("div")
  errorEl.className = "error-message"
  errorEl.textContent = message
  errorEl.style.cssText = "color: #ef4444; font-size: 0.875rem; margin-top: 5px;"
  field.parentNode.appendChild(errorEl)

  // Add error styling to field
  field.style.borderColor = "#ef4444"
}

// Submit Form
function submitForm(data) {
  const submitBtn = document.querySelector(".btn-submit")
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true
  submitBtn.style.opacity = "0.7"

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showSuccessMessage()

    // Reset form
    document.getElementById("contactForm").reset()

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    submitBtn.style.opacity = "1"
  }, 2000)
}

// Show Success Message
function showSuccessMessage() {
  const successEl = document.createElement("div")
  successEl.className = "success-message"
  successEl.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #22c55e, #16a34a);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
            animation: fadeInUp 0.5s ease-out;
        ">
            <h3 style="margin: 0 0 10px 0;">Message Sent Successfully!</h3>
            <p style="margin: 0;">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
    `

  const form = document.getElementById("contactForm")
  form.parentNode.insertBefore(successEl, form)

  // Remove success message after 5 seconds
  setTimeout(() => {
    successEl.remove()
  }, 5000)
}

// Initialize Animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".project-card, .blog-card, .skill-item, .experience-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    observer.observe(el)
  })
}

// Smooth Scrolling for Internal Links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Keyboard Navigation Enhancement
document.addEventListener("keydown", (e) => {
  // ESC key to close any modals or reset filters
  if (e.key === "Escape") {
    const activeFilter = document.querySelector(".filter-btn.active")
    if (activeFilter && activeFilter.textContent !== "All") {
      document.querySelector(".filter-btn").click() // Click "All" filter
    }
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add scroll-based navbar background
const navbar = document.querySelector(".navbar")
if (navbar) {
  const handleScroll = debounce(() => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(15, 32, 39, 0.95)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.background = "transparent"
      navbar.style.backdropFilter = "none"
    }
  }, 10)

  window.addEventListener("scroll", handleScroll)
}
