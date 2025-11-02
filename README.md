# 🎯 LeetCode Random Problem Picker

A Chrome extension that helps you pick random problems from your LeetCode study plans and problem lists, with an option to filter for unsolved problems only.

## ✨ Features

- **Random Problem Selection** - Pick a random problem from any LeetCode page with problem lists
- **Unsolved Filter** - Toggle to show only unsolved problems
- **Smart Detection** - Automatically detects both:
  - ✅ Green checkmarks (solved in current study plan)
  - ✅ Gray checkmarks (solved elsewhere)
- **Clean UI** - Simple, minimal popup interface
- **Quick Access** - One-click random problem selection

## 🚀 Installation

### From Source

1. Clone this repository or download the ZIP file
   ```bash
   git clone https://github.com/TanmayTiwarii/Leetcode_random_problem_extension.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right corner)

4. Click **Load unpacked**

5. Select the extension folder

6. The extension is now installed! 🎉

## 📖 How to Use

1. Navigate to any LeetCode page with a problem list (e.g., study plans, problem sets)

2. Click on the extension icon in your Chrome toolbar

3. (Optional) Check **"Unsolved Only"** to filter for unsolved problems

4. Click **"Pick Random"**

5. A random problem will open in a new tab!

## 🛠️ Technical Details

### Built With
- Vanilla JavaScript
- Chrome Extension Manifest V3
- Chrome Scripting API

### Files Structure
```
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup UI
├── popup.js          # Popup logic
├── background.js     # Background service worker
├── content.js        # Content script (empty placeholder)
└── README.md         # Documentation
```

## 🔧 How It Works

1. **Problem Detection**: Scans the current page for all LeetCode problem links
2. **Solved Status Check**: Identifies checkmark SVGs to determine solved problems
3. **Filtering**: Excludes solved problems if "Unsolved Only" is enabled
4. **Random Selection**: Picks a random problem from the filtered list
5. **Navigation**: Opens the selected problem in a new tab

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Tanmay Tiwari**
- GitHub: [@TanmayTiwarii](https://github.com/TanmayTiwarii)

## 🤝 Contributors

Special thanks to:
- **Priyanshu Raj** ([@priyanshuraj27](https://github.com/priyanshuraj27)) - Added the "Unsolved Only" filter feature

## 🙏 Acknowledgments

- Thanks to LeetCode for providing an excellent platform for coding practice
- Inspired by the need to randomly practice unsolved problems

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ for LeetCode enthusiasts