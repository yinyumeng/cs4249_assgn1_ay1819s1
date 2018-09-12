# cs4249 Assignment 1
This repository contains a basic interface and instrumentation to perform an empirical evaluation of Marking Menus and Radial Menus. You are expected to modify the code to perform the following tasks
1. Implement a new Independent Variable
2. Implement a new Dependent Variable
3. Modify tracking to record participant id, consent, pre-survey and post-survey questionnaires.

 You may fork this repository to your own Github account and clone your forked version for development. This will also help you use Github pages for hosting if you plan to conduct experiments online.
 
 ## Project Structure
 Please check https://yinyumeng.github.io/cs4249_assgn1_ay1819s1/index.html for demo of the project.
 
    ├── css                     # Style Sheets
         ├── external           
         ├── experiment.css  
         ├── bootstrap.css  
         ├── common.css  
         ├── nav.css    
    ├── js                      # Javascript
         ├── external          
         ├── experiment.js    
         ├── experiment-tracker.js
         ├── index.js
         ├── instructions.js
         ├── post-questionire.js
         ├── pre-questionnaire.js
    ├── data           
         ├── experiment_1.csv     # Contains arrangement of trials for participant 1
         ├── experiment_2.csv     # Contains arrangement of trials for participant 2
         ├── experiment_3.csv     # Contains arrangement of trials for participant 3
         ├── experiment_4.csv     # Contains arrangement of trials for participant 4
         ├── experiment_5.csv     # Contains arrangement of trials for participant 5
         ├── experiment_6.csv     # Contains arrangement of trials for participant 6
         ├── experiment_7.csv     # Contains arrangement of trials for participant 7
         ├── experiment_8.csv     # Contains arrangement of trials for participant 8
         ├── menu_depth_1_breadth_2.csv   # Menu with depth 1 and breadth 2
	 ├── menu_depth_1_breadth_4.csv   # Menu with depth 1 and breadth 4
         ├── menu_depth_2_breadth_2.csv   # Menu with depth 2 and breadth 2
         ├── menu_depth_2_breadth_4.csv   # Menu with depth 2 and breadth 4
         ├── manu_depth_3_breadth_2.csv   # Menu with depth 3 and breadth 2
         ├── manu_depth_3_breadth_4.csv   # Menu with depth 3 and breadth 4
         ├── trail.csv  # Contains arrangement of trails for practicing
    ├── index.html  
    ├── pre-experiment-questionnaire.html  
    ├── instruction.html  
    ├── experiment.html  
    ├── post-experiment-questionnaire.html  
    ├── exit.html  

Ideally, you shouldn't need to edit any of the files under "/external" unless your experimental design requires modifications to the menu implementation. Please avoid tweaking parameters of the menu such as color, size etc. To maintain consistency across the class we will use the default parameters as provided in this repository.

### Overall Process
In the experiment, participant will go through following sections.
Throughout the whole experiment, `participantID` will be passed using the tracking url. 
- `Home`: In this section, an introduction of the experiment will be provided to participant. Participant will need to sign the consent to proceed to next section.
- `Post-questionnaire`: In this section, participant will complete a Pre-experiment questionnaire. 
- `Instructions`: In this section, a detailed instruction of the process for experiment will be provided to participant.
- `Practice Sets`: In this section, 8 practice trail will be provided for participant to get familiar with two kinds of menus
- `Experiments`: In this section, participant will conduct the real experiments. ParticipantID will be used to select the test case from 8 experiment configurations.
- `Post-questionnaire`: In this section, participant will complete a Post-experiment questionnaire.
- `Thank you`

### Experiment Output

- pre-questionaire_participant_{participantID}.csv :
`Age, Gender, Education, Occupation, Computer using frequency, OS, device, Familiar with Marking Menu, Familiar with Radial Menu`
- experiment_participant_{participantID}.csv :   
`Trial,Attempt,Menu Type,Menu Depth,Menu Breadth,Target Item,Selected Item,Attempt Count,Start Time,End Time`
- post-questionaire_participant_{participantID}.csv :
`Marking Menu ease of use, Radial Menu ease of use, Marking Menu accuracy, Radial Menu accuracy, Marking Menu using preference, Radial Menu using preference, Occupation, Occupation, Occupation`

### Marking Menu 
- Popup: Left Mouse Down
- Select: Stroke to leaf node
- Reset: Release Mouse Down
- Note:* Expert user's can make a fast stroke instead of waiting for the manu to pop up.
### Radial Menu:
- Popup: Right Click
- Select: Left Click
- Reset: Right Click
   
### Recommended Browsers
This repository has been tested on the browsers listed below. It is suggested you use Chrome.
1. Chrome 68.0.3440.106
2. Firfox 61.0.2
3. Safari V10

 ## Credits
This repository contains modified implementations of menus from the original contributors listed below.
1. Marking Menu : Forked from https://github.com/QuentinRoy/Marking-Menu
2. Radial Menu : Forked from https://github.com/lgrkvst/d3-sunburst-menu

