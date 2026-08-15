import markdown
import os
import subprocess

md_path = r"C:\Users\papic\Desktop\AETERNA-ECO-TRANSMUTER\AETERNA_QKD_PART_B_MASTER_PROPOSAL.md"
html_path = r"C:\Users\papic\Desktop\AETERNA-ECO-TRANSMUTER\AETERNA_QKD_PART_B_PROPOSAL.html"
pdf_path = r"C:\Users\papic\Desktop\AETERNA-ECO-TRANSMUTER\AETERNA_QKD_PART_B_TECHNICAL_PROPOSAL.pdf"

with open(md_path, 'r', encoding='utf-8') as f:
    md_content = f.read()

try:
    import markdown
    html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
except Exception:
    html_body = f"<pre>{md_content}</pre>"

full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>AETERNA-QKD Part B Technical Proposal</title>
<style>
@page {{
    size: A4;
    margin: 20mm;
}}
body {{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    color: #1a1a1a;
}}
.cover-box {{
    background: #003399;
    color: white;
    padding: 24px;
    border-radius: 6px;
    margin-bottom: 25px;
}}
.cover-box h1 {{
    color: #ffcc00;
    margin: 0 0 10px 0;
    font-size: 20pt;
}}
.cover-box h3 {{
    margin: 0;
    font-size: 13pt;
    font-weight: normal;
}}
.cover-meta {{
    margin-top: 15px;
    font-size: 10pt;
    border-top: 1px solid rgba(255,255,255,0.3);
    padding-top: 10px;
}}
h1 {{
    color: #003399;
    font-size: 16pt;
    border-bottom: 2px solid #003399;
    padding-bottom: 4px;
    margin-top: 25px;
}}
h2 {{
    color: #003399;
    font-size: 13pt;
    border-bottom: 1px solid #ddd;
    padding-bottom: 3px;
    margin-top: 20px;
}}
h3 {{
    color: #2c3e50;
    font-size: 11pt;
    margin-top: 14px;
}}
table {{
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 9.5pt;
}}
th, td {{
    border: 1px solid #b0c4de;
    padding: 7px 10px;
    text-align: left;
}}
th {{
    background-color: #e8f0fe;
    color: #003399;
    font-weight: bold;
}}
tr:nth-child(even) {{
    background-color: #f9fbfd;
}}
pre {{
    background: #f4f6f9;
    border: 1px solid #dcdcdc;
    padding: 10px;
    border-radius: 4px;
    font-size: 8.5pt;
    overflow-x: auto;
}}
</style>
</head>
<body>
<div class="cover-box">
    <h1>EUROPEAN COMMISSION — HORIZON EUROPE / EUROHPC JU</h1>
    <h3>Proposal Part B: Technical Description (Annex 1) — Research and Innovation Action (RIA)</h3>
    <div class="cover-meta">
        <strong>Call:</strong> HORIZON-JU-EUROHPC-2026-NQKD-12 | <strong>Topic:</strong> HORIZON-JU-EUROHPC-2026-NQKD-12-01<br>
        <strong>Proposal Acronym:</strong> AETERNA-QKD | <strong>Draft ID:</strong> SEP-211377138 | <strong>Total Budget:</strong> €8,000,000.00
    </div>
</div>

{html_body}

</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(full_html)

print("HTML template written successfully.")

# Try finding Edge executable
edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]

edge_exe = None
for p in edge_paths:
    if os.path.exists(p):
        edge_exe = p
        break

if edge_exe:
    cmd = [edge_exe, "--headless", "--disable-gpu", f"--print-to-pdf={pdf_path}", html_path]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_path):
        print(f"SUCCESS: PDF generated at {pdf_path} (Size: {os.path.getsize(pdf_path)} bytes)")
    else:
        print("Failed to generate PDF, error:", res.stderr)
else:
    print("Edge executable not found in default paths.")
