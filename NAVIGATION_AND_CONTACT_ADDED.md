# Navigation Bar & Contact Form Added!

Your portfolio now has a professional navigation bar and a "Get in Touch" contact form!

## What's New

### 1. **Fixed Navigation Bar**
- Appears at the top of every page with a frosted glass effect
- Sticky navigation that stays visible while scrolling
- Professional gradient logo "Rohit Karumanchi" on the left
- Navigation links on the right:
  - **About Me** - Scrolls to hero section
  - **Experience** - Scrolls to experience section
  - **Projects** - Scrolls to projects section
  - **Get in Touch** - Scrolls to contact form

### 2. **Contact Form (Get in Touch)**
- Professional contact form with 3 fields:
  - **Your Name** - Text input (required)
  - **Email Address** - Email input with validation (required)
  - **Phone Number** - Phone input (required)
- Beautiful gradient submit button with hover effects
- Success message appears after submission
- Form validation ensures all fields are filled
- Smooth animations and transitions

### 3. **Enhanced Layout**
- Added top padding (`pt-32`) to account for fixed navigation bar
- All sections properly scroll to their anchored IDs
- Smooth scroll behavior for navigation links

## Features

### Navigation Bar
- **Fixed Position**: Always visible at the top while scrolling
- **Backdrop Blur**: Frosted glass effect with `backdrop-blur-md`
- **Border**: Subtle white border at the bottom
- **Gradient Logo**: Blue to purple gradient text
- **Hover Effects**: Links turn white on hover
- **Responsive**: Works on all screen sizes

### Contact Form
- **Three Required Fields**:
  1. Name - Text input with placeholder "John Doe"
  2. Email - Email validation with placeholder "john@example.com"
  3. Phone - Tel input with placeholder "+1 (555) 123-4567"
- **Submit Button**:
  - Gradient background (blue to purple)
  - Shows "Sending..." while submitting
  - Disabled state with opacity
  - Scale animation on hover
- **Success Message**:
  - Green emerald color scheme
  - Appears after form submission
  - Confirms message was received
- **Social Links**: Email, LinkedIn, GitHub buttons below form

## How It Works

### Navigation
```tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
  <div className="mx-auto max-w-6xl px-6 py-4">
    <div className="flex items-center justify-between">
      <h2>Rohit Karumanchi</h2>
      <div className="flex gap-6">
        <a href="#about">About Me</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Get in Touch</a>
      </div>
    </div>
  </div>
</nav>
```

### Contact Form State Management
```tsx
const [contactForm, setContactForm] = useState({
  name: '',
  email: '',
  phone: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitMessage, setSubmitMessage] = useState('');

const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Simulate form submission (1.5 seconds)
  setTimeout(() => {
    setSubmitMessage('Thank you! Your message has been received...');
    setContactForm({ name: '', email: '', phone: '' });
    setIsSubmitting(false);
  }, 1500);
};
```

## Section IDs

All sections have proper ID attributes for navigation:
- `#about` - Hero/About Me section with 3D scene
- `#experience` - Work experience at Neiman Marcus
- `#projects` - Project cards (Nava, Retail Platform, Supply Chain)
- `#contact` - Contact form

## Styling Details

### Navigation Bar
- Background: `bg-slate-950/80` (80% opacity dark background)
- Backdrop blur: `backdrop-blur-md`
- Border: `border-b border-white/10`
- Z-index: `z-50` (always on top)
- Max width: `max-w-6xl` (matches content)

### Contact Form Inputs
- Background: `bg-white/5` (5% white overlay)
- Border: `border-white/10` with focus state `border-purple-500/50`
- Text: White with slate-500 placeholders
- Rounded: `rounded-xl` (extra large border radius)
- Transition: Smooth transitions on all states

### Submit Button
- Gradient: `from-blue-600 to-purple-600`
- Shadow: `shadow-lg shadow-purple-500/50`
- Hover: Scale 1.05 with increased shadow
- Disabled: 50% opacity, no hover effect

## Form Submission

Currently, the form simulates submission with a 1.5-second delay. To integrate with a real backend:

### Option 1: Email Service (EmailJS, SendGrid)
```tsx
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactForm),
    });
    setSubmitMessage('Thank you! Your message has been received...');
    setContactForm({ name: '', email: '', phone: '' });
  } catch (error) {
    setSubmitMessage('Failed to send. Please try again or email directly.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Option 2: Direct Email Link
Replace form submission to open email client:
```tsx
const emailBody = `Name: ${contactForm.name}%0D%0AEmail: ${contactForm.email}%0D%0APhone: ${contactForm.phone}`;
window.location.href = `mailto:rkkarumanchi98@gmail.com?subject=Contact from Portfolio&body=${emailBody}`;
```

## Customization

### Change Navigation Links
Edit [page.tsx:211-224](src/app/page.tsx#L211-L224):
```tsx
<div className="flex gap-6">
  <a href="#about">About Me</a>
  <a href="#skills">Skills</a>  // Add new section
  <a href="#contact">Contact</a>
</div>
```

### Change Form Fields
Edit [page.tsx:577-621](src/app/page.tsx#L577-L621) to add/remove fields:
```tsx
<div>
  <label htmlFor="message">Message</label>
  <textarea
    id="message"
    value={contactForm.message}
    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
  />
</div>
```

### Change Success Message
Edit [page.tsx:196](src/app/page.tsx#L196):
```tsx
setSubmitMessage('Custom message here!');
```

## Mobile Responsive

The navigation and contact form are fully responsive:
- Navigation stacks or scrolls on mobile
- Form fields take full width on small screens
- Social links wrap to multiple rows if needed
- All hover effects work on touch devices

## Result

Your portfolio now features:
- Professional sticky navigation bar
- Smooth scroll to all sections
- Beautiful contact form with validation
- Success feedback for users
- Social media links
- Fully responsive design

**View it at:** http://localhost:3000 (or port 3001 if 3000 is busy)

Click "Get in Touch" in the navigation to see the contact form!
