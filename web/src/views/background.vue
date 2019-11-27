<template>
  <div id="background-color">
    <div class="stars"></div>
    <div class="mountains">
      <div class="mountain mountain-3"></div>
      <div class="mountain mountain-2"></div>
      <div class="mountain mountain-1"></div>
    </div>

    <div class="auroras">
      <div class="aurora aurora-1"></div>
      <div class="aurora aurora-2"></div>
      <div class="aurora aurora-3"></div>
      <div class="aurora aurora-4"></div>
      <div class="aurora aurora-5"></div>
      <div class="aurora aurora-6"></div>
      <div class="aurora aurora-7"></div>
      <div class="aurora aurora-8"></div>
      <div class="aurora aurora-9"></div>
      <div class="aurora aurora-10"></div>
      <div class="aurora aurora-11"></div>
      <div class="aurora aurora-12"></div>
      <div class="aurora aurora-13"></div>
      <div class="aurora aurora-14"></div>
    </div>
    <div class="bear"></div>
  </div>
</template>

<style lang="less" scoped>
#background-color {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #464853;
  z-index: -1;
  .stars {
    width: 300vw;
    height: 100%;
    background: url("../assets/bg-space-6e69cd1.png") repeat-x;
    animation: moving 450s linear 0.8s infinite normal none;
    transform: translate3d(0, 0, 0);
    @keyframes moving {
      0% {
        transform: translate3d(0, 0, 0);
      }

      100% {
        transform: translate3d(-50%, 0, 0);
      }
    }
  }
  .bear {
    position: absolute;
    width: 200px;
    height: 100px;
    bottom: 50px;
    background: url("../assets/bear-25676f9.png") no-repeat;
    animation: bear 0.8s steps(8) infinite, move 20s linear infinite;
    @keyframes bear {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -1600px 0;
      }
    }
    @keyframes move {
      0% {
        left: 0;
      }
      100% {
        left: 100%;
        // transform: translateX(-50%);
      }
    }
  }
  .mountains {
    width: 100vw;
    height: 504px;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    .mountain {
      width: 6720px;
      height: 504px;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: opacity 0.2s linear 0s;
    }
    .mountain-1 {
      transform: translate3d(0, 0, 0);
      height: 300px;
      background: url("../assets/bg-mountain-1.png") repeat-x;
      animation: moving 100s linear 0.8s infinite normal none;
    }

    .mountain-2 {
      transform: translate3d(0, 0, 0);
      height: 336px;
      background: url("../assets/bg-mountain-2.png") repeat-x;
      animation: moving 160s linear 0.8s infinite normal none;
    }

    .mountain-3 {
      transform: translate3d(0, 0, 0);
      height: 504px;
      background: url("../assets/bg-mountain-3.png") repeat-x;
      animation: moving 360s linear 0.8s infinite normal none;
    }
    @keyframes moving {
      0% {
        transform: translate3d(0, 0, 0);
      }

      100% {
        transform: translate3d(-50%, 0, 0);
      }
    }
  }

  .auroras {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    .aurora {
      width: 120%;
      height: 90%;
      position: absolute;
      top: 0;
      left: -10%;
      opacity: 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .aurora-1 {
      background-image: url("../assets/bg-aurora-1.png");
      animation: aurora 7s linear 0.2s infinite normal none;
    }

    .aurora-2 {
      background-image: url("../assets/bg-aurora-2.png");
      animation: aurora 7s linear 0.7s infinite normal none;
    }

    .aurora-3 {
      background-image: url("../assets/bg-aurora-3.png");
      animation: aurora 7s linear 1.2s infinite normal none;
    }

    .aurora-4 {
      background-image: url("../assets/bg-aurora-4.png");
      animation: aurora 7s linear 1.7s infinite normal none;
    }

    .aurora-5 {
      background-image: url("../assets/bg-aurora-5.png");
      animation: aurora 7s linear 2.2s infinite normal none;
    }

    .aurora-6 {
      background-image: url("../assets/bg-aurora-4.png");
      animation: aurora 7s linear 2.7s infinite normal none;
    }

    .aurora-7 {
      background-image: url("../assets/bg-aurora-3.png");
      animation: aurora 7s linear 3.2s infinite normal none;
    }

    .aurora-8 {
      background-image: url("../assets/bg-aurora-2.png");
      animation: aurora 7s linear 3.7s infinite normal none;
    }

    .aurora-9 {
      background-image: url("../assets/bg-aurora-1.png");
      animation: aurora 7s linear 4.2s infinite normal none;
    }

    .aurora-10 {
      background-image: url("../assets/bg-aurora-2.png");
      animation: aurora 7s linear 4.7s infinite normal none;
    }

    .aurora-11 {
      background-image: url("../assets/bg-aurora-3.png");
      animation: aurora 7s linear 5.2s infinite normal none;
    }

    .aurora-12 {
      background-image: url("../assets/bg-aurora-4.png");
      animation: aurora 7s linear 5.7s infinite normal none;
    }

    .aurora-13 {
      background-image: url("../assets/bg-aurora-3.png");
      animation: aurora 7s linear 6.2s infinite normal none;
    }

    .aurora-14 {
      background-image: url("../assets/bg-aurora-2.png");
      animation: aurora 7s linear 6.7s infinite normal none;
    }
    @keyframes aurora {
      0% {
        opacity: 0;
      }

      14% {
        opacity: 1;
      }

      28% {
        opacity: 0;
      }

      100% {
        opacity: 0;
      }
    }
  }
}
</style>