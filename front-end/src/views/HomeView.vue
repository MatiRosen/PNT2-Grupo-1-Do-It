<template>
  <main>
    <section id="index">
      <div class="container">
        <div class="row">
          <div class="col-md-12 d-flex justify-content-center">
            <p class="efecto rounded-pill">
              ¡Bienvenido!
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script></script>

<style>
#index {
  background: url("../assets/index.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
#index .container {
  height: 70vh;
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-items: center;
  justify-content: flex-end;
}
#index .efecto {
  color: white;
  font-size: 22px;
  font-weight: 400;
  border: 1px solid white;
  width: fit-content;
  padding: 5px 10px;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  /* Ensures the content is not revealed until the animation */
  /*border-right: .15em solid white; /* The typwriter cursor */
  white-space: nowrap;
  /* Keeps the content on a single line */
  margin: 0 auto;
  /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.15em;
  /* Adjust as needed */
  animation: typing 3.5s steps(40, end);
}
/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
