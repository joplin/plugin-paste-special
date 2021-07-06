# Paste Special Plugin

This plugin is for pasting formatted text and provide sub-menu options inside it to paste from user clipboard. The sub-menu will contain options for file formats like Paste Excel or CSV as markdown table.

![Screen-Recording-2021-07-05-at-3](https://user-images.githubusercontent.com/35633575/124400631-7a55fb00-dd41-11eb-8ac0-dc1503438a6c.gif)

## Building the plugin

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.

The project is setup to use TypeScript, although you can change the configuration to use plain JavaScript.

## Testing the plugin

To test the plugin, simply run `npm test`.

This project is setup to use Jest, for testing purposes.

## Updating the plugin framework

To update the plugin framework, run `npm run update`.

In general this command tries to do the right thing - in particular it's going to merge the changes in package.json and .gitignore instead of overwriting. It will also leave "/src" as well as README.md untouched.

The file that may cause problem is "webpack.config.js" because it's going to be overwritten. For that reason, if you want to change it, consider creating a separate JavaScript file and include it in webpack.config.js. That way, when you update, you only have to restore the line that include your file.

## Timeline
### June 7 - June 21 (2 weeks)
- Create UI layouts of plugin
- Create base structure of plugin

### June 21 - July 5 (2 weeks)
- Write code for parsing CSV
- Write code for conversion of parsed CSV to Markdown Table
- Write test cases for the code

### July 5 - July 12 (1 week) - Phase 1 Eval
- Submit first version for community feedback of the plugin.
- Submission of the first evaluation.
- University final exams period (from 26th June to 15th July)

### July 12 - July 26 (2 weeks)
- University final exams period (from first of July until 15th)
- Implement any feedback from the community and/or bugs.

### July 26 - August 9 (2 weeks)
- Implement any leftover feedback from the community and/or bugs.
- Create layout for more menu options for Paste Special Plugin (i.e. PDF to MD, HTML to MD etc. (if approved))

### August 9 - August 16 (1 week)
- Write code for the decided option and it's test cases.
- Test plugin boundary cases
- Get community feedback of the plugin

### August 16 - August 23 (1 week) - Final Eval
- Review all code and cleanup.
- Code delivery.
- Mentor Evaluation.

## Mentors

- Helmut K. C. Tessarek (@tessus)
- Stefan (@PackElend)

## Development Dependencies

- [Papa Parse](https://www.papaparse.com/)
