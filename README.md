# Signal Diagram

### About

Signal Diagram is a Svelte app designed to create signal and power diagrams for modular LED screen builds. It is completely free, and requires no login to use. PNG files can be download from the Export button in the toolbar. Saving a layout downloads a .json file. This file can be loaded into the app to recall a configuration.

### Reporting Bugs

Please post bugs to the forum on the issues tab above

### Pull Requests

Signal Diagram utilises HTML canvas. I would like to change the draw functionality over to svg in the future. User input populates arrays for each type of object. Drawing is executed when those arrays are updated. Most variables are stores in src/store.js and most functionaly is driver by svelte's reactive functionality.

I will be adding comments explaining which code triggers which code.
