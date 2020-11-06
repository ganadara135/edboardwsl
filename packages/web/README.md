# issue
1. create-react-app 이 현 시점까지는 외부 소스 링크 지원이 안됨
  ex) Currently create-react-app does not support more then one src dir in root directory
2. 위 문제는 controller 의 tsconfig.js  "outDir": "./dist/"   처럼 잘못 입력해서 발생,  
3. 현재 docker 버전은 "react-scripts": "3.2.0",  버전까지만 됨,  상위 버전 안 됨
4. create-react-app  에선 환경변수로   REACT_APP_  으로 시작하는 값만 처리해줌

# 설치과정

1. docker 이미지 빌드 <br>
   => docker build -t kcod/abbweb:1.0.7 . 
    1.1. docker 컨테이너 실행 <br>
        => docker run -d -p 80:80 -v $PWD/nginx_conf/default.conf:/etc/nginx/conf.d/default.conf --name abbweb kcod/abbweb:1.0.7
    1.2. docker 컨테이너 디버깅 <br>
        => docker commit 298b7344f067a4a1d96fa866ee93e1304c98d9b9c0124da616e80e5ef9d17f33 broken_container  &&={ ; } docker run -it broken_container /bin/bash <br>
        => node dist/index.js <br>
2. docker push on dockerhub
   docker tag local-image:tagname new-repo:tagname
   docker push new-repo:tagname
   2.1 docker tag kcod/abbweb:1.0.7  ganadara135/abbweb:latest
   2.2 docker push ganadara135/abbweb:latest


참고자료 :
1. nginx 설정 : https://blog.naver.com/ganadara1379/221872407771



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
