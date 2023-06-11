<template>
  <section id="perfil">
    <div class="container">
      <div class="row top-separation perfilcard">  
        <div class="card shadow-lg mb-4">
          <div class="card-body position-relative">
            <div class="row">
              <div class="col-md-4 text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  class="rounded-circle img-fluid"
                  style="width: 350px"
                />           
                <h4 class="mt-3">{{ user.tipo }}</h4>     
              </div>
              <div class="col-md-8">
                <div class="row mt-4">
                  <div class="col-md-5">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-md-7">
                    <p class="text-muted mb-0">{{ user.nombre +" "+ user.apellido }}</p>
                  </div>
                </div>
                <hr />
                <div class="row mt-4">
                  <div class="col-md-5">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-md-7">
                    <p class="text-muted mb-0">{{ user.email }}</p>
                  </div>
                </div>
                <hr />
                <div class="row mt-4">
                  <div class="col-md-5">
                    <p class="mb-0">Phone</p>
                  </div>
                  <div class="col-md-7">
                    <p class="text-muted mb-0">{{ user.telefono }}</p>
                  </div>
                </div>
                <hr />
                <div class="row mt-4">
                  <div class="col-md-5">
                    <p class="mb-0">Genero</p>
                  </div>
                  <div class="col-md-7">
                    <p class="text-muted mb-0">{{ user.genero }}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-5">
                    <p class="mb-0">Direccion</p>
                  </div>
                  <div class="col-md-7">
                    <p class="text-muted mb-0">{{ user.direccion }}</p>
                  </div>
                </div>
                <div v-if="esInversor">
                  <div class="row mt-2 justify-content-right">
                    <div class="col-md-5 pr-0">
                      <RouterLink to="/billetera"
                        ><button class="btn btn-success">
                          Agregar dinero
                        </button></RouterLink
                      >
                    </div>
                    <div class="col-md-4 pl-0">
                      <RouterLink to="/inversor/inversiones"
                        ><button class="btn btn-danger">
                          Inversiones
                        </button></RouterLink
                      >
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="row m-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);
let { esInversor } = storeToRefs(storeUser);
</script>

<style scoped>
.container {
  height: 55vh;
    display: flex;
    width: fit-content;
    flex-direction: column;
    justify-items: center;
    justify-content: flex-end;     
}
</style>
