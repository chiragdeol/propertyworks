import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Top Header Bar
        self.setFillColor(colors.HexColor("#001B4F"))
        self.rect(0, 770, 612, 22, fill=True, stroke=False)
        self.setFillColor(colors.HexColor("#D4A13A"))
        self.rect(0, 767, 612, 3, fill=True, stroke=False)
        
        # Footer Bar
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.8)
        self.line(40, 45, 572, 45)
        
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#001B4F"))
        self.drawString(40, 30, "PROPERTYWORKS REAL ESTATE ADVISORY — CLIENT SOP & ADMIN GUIDE")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawRightString(572, 30, page_str)
        self.restoreState()

def create_sop_pdf(filename="PropertyWorks_Admin_SOP_Guide.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=60
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    c_navy = colors.HexColor("#001B4F")
    c_gold = colors.HexColor("#D4A13A")
    c_dark = colors.HexColor("#1E293B")
    c_slate = colors.HexColor("#475569")
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_navy,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=c_slate,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=c_navy,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_gold,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=c_dark,
        spaceAfter=8
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#0F172A"),
        backColor=colors.HexColor("#F1F5F9"),
        borderColor=colors.HexColor("#CBD5E1"),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=8
    )

    note_style = ParagraphStyle(
        'NoteBox',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1E3A8A"),
        backColor=colors.HexColor("#EFF6FF"),
        borderColor=colors.HexColor("#BFDBFE"),
        borderWidth=0.8,
        borderPadding=8,
        spaceBefore=6,
        spaceAfter=10
    )

    story = []

    # Title Block
    story.append(Paragraph("Property<b>Works</b> Standard Operating Procedure", title_style))
    story.append(Paragraph("<b>Website Administration, Content Management & Security Guide</b>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_gold, spaceAfter=15))

    # Introduction Box
    intro_text = (
        "<b>Welcome to your PropertyWorks Website Management Guide!</b><br/>"
        "This document provides clear, step-by-step instructions for managing your website content, update requests, "
        "and security settings. It covers both instant Admin Panel updates and code-level configuration for complete control."
    )
    story.append(Paragraph(intro_text, note_style))

    # SECTION 1
    story.append(Paragraph("1. Website Administration Overview", h1_style))
    story.append(Paragraph(
        "The PropertyWorks platform features a live Express & React backend architecture. Updates made inside the "
        "Admin Panel take effect immediately across all website sections without needing server restarts.", body_style
    ))
    
    admin_table_data = [
        [Paragraph("<b>Portal</b>", body_style), Paragraph("<b>URL Location</b>", body_style), Paragraph("<b>Default Credentials</b>", body_style)],
        [Paragraph("Live Admin Panel", body_style), Paragraph("<u>https://www.propertyworks.in/admin</u>", body_style), Paragraph("Password: <b>admin123</b>", body_style)],
        [Paragraph("Local Dev Admin", body_style), Paragraph("<u>http://localhost:5173/admin</u>", body_style), Paragraph("Password: <b>admin123</b>", body_style)]
    ]
    t = Table(admin_table_data, colWidths=[120, 240, 172])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#001B4F")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    # Adjust table text color for header row
    for col in range(3):
        admin_table_data[0][col].style.textColor = colors.white
    story.append(t)
    story.append(Spacer(1, 10))

    # SECTION 2
    story.append(Paragraph("2. Changing the Admin Password (via Code Base)", h1_style))
    story.append(Paragraph(
        "For maximum security, the master Administrator password is stored in the system database configuration file. "
        "To update your password, follow these simple steps:", body_style
    ))

    p_steps = [
        "<b>Step 1:</b> Open your project folder in your code editor (e.g. VS Code, Antigravity).",
        "<b>Step 2:</b> Navigate to the backend database file path: <font color='#001B4F'><b>backend/database/admin.json</b></font>",
        "<b>Step 3:</b> Modify the <b>passwordHash</b> value to your desired new password:",
    ]
    for step in p_steps:
        story.append(Paragraph(step, body_style))

    story.append(Paragraph(
        '{\n  "passwordHash": "YourNewSecurePassword123"\n}', code_style
    ))
    story.append(Paragraph("<b>Step 4:</b> Save the file. The new password is active immediately for all future logins.", body_style))

    # SECTION 3
    story.append(Paragraph("3. SOP: Website Content & Image Management (via Admin Panel)", h1_style))
    story.append(Paragraph(
        "You can manage all real estate projects, articles, contact channels, lead consent, and page sections directly "
        "from the visual Admin Panel dashboard.", body_style
    ))

    story.append(Paragraph("A. Real Estate Projects Management", h2_style))
    story.append(Paragraph(
        "• <b>Adding a New Project:</b> Go to <b>Projects</b> tab &rarr; Click <b>+ Add New Project</b>. Fill project details (Title, Developer, City, Locality, Budget, Highlights, Overview) & upload image assets.<br/>"
        "• <b>Editing Existing Projects:</b> Click the <b>Edit (Pencil)</b> icon next to any listed project to change prices, details, status, or images.<br/>"
        "• <b>Deleting Projects:</b> Click the <b>Trash</b> icon to instantly remove obsolete listings.", body_style
    ))

    story.append(Paragraph("B. Knowledge Center & Articles", h2_style))
    story.append(Paragraph(
        "• <b>Publishing Articles:</b> Go to <b>Articles</b> tab &rarr; Click <b>+ Add New Article</b>. Enter Article Title, Category (Residential/Commercial/Investment), Author, Read Time, and Markdown Content.<br/>"
        "• <b>SEO Optimization:</b> Fill Meta Title & Meta Description for higher search engine rankings.", body_style
    ))

    story.append(Paragraph("C. Global Site Settings & Contact Details", h2_style))
    story.append(Paragraph(
        "• <b>WhatsApp & Phone Number:</b> Go to <b>Settings</b> tab. Update <i>WhatsApp Number</i> or <i>Contact Phone</i>.<br/>"
        "• <b>Support Email:</b> Update <i>Contact Email</i> (e.g. <b>support@propertyworks.in</b>). This automatically syncs across the Footer, Contact Page, and all Legal Policy pages.<br/>"
        "• <b>Lead Consent Wording:</b> Edit the mandatory privacy consent text rendered in shortlist modals.", body_style
    ))

    story.append(Paragraph("D. Page Sections & Hero Banner Customization", h2_style))
    story.append(Paragraph(
        "• Go to <b>Page Sections</b> tab to edit text headlines, subheadings, quotes, and descriptions for Hero, Service Overview, About Us, Why Choose Us, and FAQs without touching code.<br/>"
        "• Wrap words in <font color='#D4A13A'><b>[gold]Word[/gold]</b></font> tag inside any headline input to render golden highlighted text automatically on the website!", body_style
    ))

    story.append(Spacer(1, 10))

    # SECTION 4
    story.append(Paragraph("4. Leads Management & Data Exports", h1_style))
    story.append(Paragraph(
        "• All client enquiries submitted through the <b>Residential Shortlist</b> and <b>Commercial Shortlist</b> modals are stored securely in the database.<br/>"
        "• Go to the <b>Leads</b> tab to view client contact numbers, requested budget, location preference, and timestamp.<br/>"
        "• Click <b>Export to CSV / Excel</b> to download lead data for your CRM and follow-up team.", body_style
    ))

    # SECTION 5
    story.append(Paragraph("5. Google Business Profile Quick Reference", h1_style))
    
    gbp_data = [
        [Paragraph("<b>Field Name</b>", body_style), Paragraph("<b>Official Business Details</b>", body_style)],
        [Paragraph("Business Name", body_style), Paragraph("<b>PropertyWorks</b>", body_style)],
        [Paragraph("Official Website", body_style), Paragraph("<b>https://www.propertyworks.in</b>", body_style)],
        [Paragraph("Primary Phone", body_style), Paragraph("<b>+91-8433826365</b>", body_style)],
        [Paragraph("Support Email", body_style), Paragraph("<b>support@propertyworks.in</b>", body_style)],
        [Paragraph("Business Category", body_style), Paragraph("<b>Real Estate Advisory</b>", body_style)],
        [Paragraph("Service Areas", body_style), Paragraph("Mumbai, Thane, Navi Mumbai and surrounding Growth corridors", body_style)],
        [Paragraph("Operating Hours", body_style), Paragraph("10:00 AM – 6:00 PM (Monday to Saturday)", body_style)],
        [Paragraph("Registered Address", body_style), Paragraph("B-202, Lodha Splendora, G.B Road, Thane West, 400615", body_style)],
    ]
    t_gbp = Table(gbp_data, colWidths=[160, 372])
    t_gbp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#001B4F")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    for col in range(2):
        gbp_data[0][col].style.textColor = colors.white
    story.append(t_gbp)

    story.append(Spacer(1, 15))
    story.append(Paragraph(
        "<b>Need Technical Support?</b> Contact your development team or system administrator for assistance.", note_style
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF generated successfully:", filename)

if __name__ == "__main__":
    create_sop_pdf()
