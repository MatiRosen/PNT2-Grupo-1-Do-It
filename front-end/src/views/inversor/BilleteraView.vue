<template>
  <section id="Loguear">
    <div class="container">
      <div class="row">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row text-center">
              <h2>Ingresar Dinero</h2>
            </div>
            <div class="row">
              <div class="col-md-12 mt-3">
                <form
                  @submit.prevent="agregarDinero(usuario, user, vue)"
                  class="article__form"
                  name="form"
                >
                  <div>
                    <input
                      v-model="usuario.dinero"
                      type="number"
                      name="Dinero"
                      id="dinero"
                      min="1"
                      class="form-control shadow"
                      placeholder="Ingrese la cantidad de dinero que desea depositar"
                      required
                    />
                    <span class="text-danger"></span>
                  </div>

                  <button class="btn btn-success">Agregar dinero</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import userService from "../../services/userService";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  setup() {
    const storeUser = useUserStore();
    const { user } = storeToRefs(storeUser);
    const { sumarDinero } = storeUser;

    return {
      user,
      sumarDinero,
    };
  },
  data() {
    return {
      usuario: {
        dinero: 0,
      },
      vue: this,
    };
  },
  methods: {
    agregarDinero: (usuario, user, vue) => {
      usuario.dinero += user.dinero;
      userService
        .sumarDinero(usuario, user.id)
        .then(function (response) {
          vue.sumarDinero(response.data.dinero);

          vue.$router.push("/inversor");
        })
        .catch(function (error) {
          alert(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
h2 {
    color: green;
}
.btn {
    background-color: green;
    border-color: green;
}
.card {
    border-radius: 20px;
    border-color: white;
    width: auto;
    border: 2;
    padding-inline: 50px;
    padding-top: 30px;
}

.card-body {
    padding: 0;
    margin: 0;
}
.container {
    height: 30vh;
    display: flex;
    width: fit-content;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
