# Quizz app

This is a React front-end application for a quiz app based on image processing. In this app, users can draw colored rectangles around images to select their answers for the quiz, including both correct and incorrect options.

### Screenshoot of app
<img width="1007" alt="Screenshot 2023-12-17 at 10 59 00 AM" src="https://github.com/leandreAlly/quiz-app-wemofy/assets/78492995/78b993a0-861b-47db-849f-0cacf4717473">

<img width="1186" alt="Screenshot 2023-12-18 at 12 57 42 PM" src="https://github.com/leandreAlly/quiz-app-wemofy/assets/78492995/17d77c13-e1f0-4917-8dcb-6040440ba711">


<img width="486" alt="Screenshot 2023-12-17 at 10 59 51 AM" src="https://github.com/leandreAlly/quiz-app-wemofy/assets/78492995/0f5a4c2f-65d1-453a-9fad-cd142f323971">


## Tech stack

[![Stack Used](https://skillicons.dev/icons?i=react,vite&theme=dark)](https://skillicons.dev)

## Work Done

1. **Upload Image**: The user has the capability to upload multiple images from their local machine, which serve as questions during gameplay.✅
2. **Draw Rectangles**: The user can draw rectangles based on the color of their choice, using red for incorrect answers, green for correct answers, and purple for selecting a question.✅
3. **Drag Rectangles**: This app provides the ability to move or drag the drawn rectangle to any position you desire.✅
4. **Resize Rectangles**: Users can also resize the rectangles to fit into the specific areas they want to select in the image.✅
5. **Delete Images**: You can delete the selected image in case you make a mistake while choosing an image from the local machine.✅
6. **Submit quiz and save data into LocalStorage**: afAfter the user verifies that all rectangles are well-organized, they can submit, and the data will be saved in the local storage..✅

## In Progress:

- Marking the submitted answer
- Show the user the correct answer
- Show the user what they missed

## INSTALLATION

### Requirements

> For development, you need to have node installed and yarn package Manager installed in your environment.

### Project Installaton

> clone the project, by running the commands below in your terminal.

```ps
git clone https://github.com/leandreAlly/quiz-app-wemofy.git
```

```ps
cd wemofy-task
```

> package installation

```ps
yarn install
```

### Running the app

> Before running the project locally, make sure you have all required packages mentioned above installed in local machine.

> development mode

```ps
yarn run dev
```

## Deployment

- [Quiz app](https://quiz-app-wemofy-leandreally.vercel.app/)
