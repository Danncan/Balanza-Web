<template>
  <main class="flex flex-col items-center p-8 min-h-screen">
    <h1 class="text-3xl font-bold text-center mb-6">Asignar Área a Estudiantes</h1>

    <Toast />

    <!-- Contenedor principal de filtros y acciones -->
    <div class="w-full max-w-6xl mb-4">
      <!-- Botón "Limpiar Filtros" en la parte superior derecha -->
      <div class="flex justify-end">
        <Button label="Limpiar Filtros"
                icon="pi pi-filter-slash"
                class="p-button-outlined p-button-secondary"
                @click="limpiarFiltros" />
      </div>

      <!-- Label aclarativo para filtros -->
      <div class="mt-4">
        <p class="text-lg font-bold">Filtros</p>
      </div>

      

      <!-- Filtros e inputs -->
      <div class="flex flex-wrap gap-4 items-center mt-2">
        <Dropdown v-model="periodoSeleccionado"
                  :options="periodos"
                  optionLabel="PeriodoNombre"
                  placeholder="Filtrar por Período"
                  class="w-72" />

                  <InputText v-model="busquedaCedula"
                   placeholder="Buscar por Cédula"
                   class="w-60 p-inputtext-lg" />

        <InputText v-model="busquedaNombre"
                   placeholder="Buscar por Nombre y Apellido"
                   class="w-72 p-inputtext-lg" />

      

        <Dropdown v-model="filtroArea"
                  :options="['Todos', 'Sin Asignar']"
                  placeholder="Filtrar por Área"
                  class="w-60" />

                    <!-- Label aclarativo para la sección de selección -->
    <div class="w-full max-w-6xl mb-1">
      <p class="text-lg font-bold">Selección:</p>
    </div>

        <Dropdown v-model="areaSeleccionada"
                  :options="opcionesAreas"
                  placeholder="Seleccionar Área para Asignar"
                  class="w-72" />

        <Button label="Asignar Área"
                icon="pi pi-check"
                class="p-button-success"
                :disabled="estudiantesSeleccionados.length === 0 || !areaSeleccionada"
                @click="confirmarAsignacion" />
      </div>
    </div>

  

    <Message v-if="errorMensaje" severity="error" class="mb-4">{{ errorMensaje }}</Message>

    <DataTable :value="estudiantesFiltrados"
               v-model:selection="estudiantesSeleccionados"
               paginator :rows="10"
               class="w-full max-w-6xl shadow-lg"
               removableSort>
      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column field="Usuario_Cedula" header="Cédula" sortable />
      <Column field="Usuario_Nombres" header="Nombres" sortable />
      <Column field="Usuario_Apellidos" header="Apellidos" sortable />
      <Column field="Usuario_Correo" header="Correo" sortable />
      <Column field="Usuario_Area" header="Área Actual" sortable>
        <template #body="slotProps">
          {{ slotProps.data.Usuario_Area || 'Sin Asignar' }}
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogoVisible"
            header="Confirmar Asignación"
            :modal="true">
      <p>¿Está seguro de asignar el área <strong>{{ areaSeleccionada }}</strong> a los {{ estudiantesSeleccionados.length }} estudiantes seleccionados?</p>
      <div class="flex justify-end gap-3">
        <Button label="Cancelar" class="p-button-danger" @click="dialogoVisible = false" />
        <Button label="Confirmar" class="p-button-success" @click="asignarArea" />
      </div>
    </Dialog>
  </main>
</template>

  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { API, type Usuario, type Periodo } from "@/views/SideBar/CRUD/Interfaces.ts";
  import Toast from 'primevue/toast';
  import { useToast } from 'primevue/usetoast';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Dropdown from 'primevue/dropdown';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Message from 'primevue/message';
  import Dialog from 'primevue/dialog';
  
  const toast = useToast();
  
  // 📌 Estados
  const estudiantes = ref<Usuario[]>([]);
  const estudiantesSeleccionados = ref<Usuario[]>([]);
  const areaSeleccionada = ref<string | null>(null);
  const filtroArea = ref<string>("Todos");
  const busquedaNombre = ref('');
  const busquedaCedula = ref('');
  const dialogoVisible = ref(false);
  const errorMensaje = ref('');
  const periodos = ref<Periodo[]>([]);
  const periodoSeleccionado = ref<Periodo | null>(null);
  
  // 📌 Opciones de áreas
  const opcionesAreas = ['Derecho Penal', 'Derecho Civil', 'Niñez y Adolescencia', 'Movilidad Humana'];
  
  // 📌 Fetch de períodos
  const fetchPeriodos = async () => {
    try {
      const res = await fetch(`${API}/periodos`);
      if (!res.ok) throw new Error('Error al obtener períodos');
      periodos.value = await res.json();
    } catch (err) {
      errorMensaje.value = 'Error al cargar períodos.';
    }
  };
  
  // 📌 Fetch de estudiantes
  const fetchEstudiantes = async () => {
    try {
      const res = await fetch(`${API}/usuarios`);
      if (!res.ok) throw new Error('Error al obtener estudiantes');
      estudiantes.value = await res.json();
    } catch (err) {
      errorMensaje.value = 'Error al cargar estudiantes.';
    }
  };
  
  // 📌 Fetch estudiantes por período
  const fetchEstudiantesPorPeriodo = async (periodoId: number) => {
    try {
      const res = await fetch(`${API}/usuarioxPeriodo/periodo/${periodoId}`);
      if (!res.ok) throw new Error('Error al obtener estudiantes del período');
      const data = await res.json();
  
      estudiantes.value = data.map((rel: any) => ({
        Usuario_Cedula: rel.usuario.Usuario_Cedula,
        Usuario_Nombres: rel.usuario.Usuario_Nombres,
        Usuario_Apellidos: rel.usuario.Usuario_Apellidos,
        Usuario_Correo: rel.usuario.Usuario_Correo,
        Usuario_Area: rel.usuario.Usuario_Area || 'Sin Asignar',
      }));
    } catch (err) {
      errorMensaje.value = 'Error al cargar estudiantes por período.';
    }
  };
  
  // 📌 Filtro dinámico
  const estudiantesFiltrados = computed(() => {
    return estudiantes.value.filter(est => {
      const coincideNombre = (est.Usuario_Nombres + ' ' + est.Usuario_Apellidos).toLowerCase().includes(busquedaNombre.value.toLowerCase());
      const coincideCedula = est.Usuario_Cedula.includes(busquedaCedula.value);
      const coincideArea = filtroArea.value === 'Sin Asignar'
        ? !est.Usuario_Area || est.Usuario_Area === 'Sin Asignar'
        : true;
      return coincideNombre && coincideCedula && coincideArea;
    });
  });
  
  // 📌 Watch: Cargar estudiantes cada vez que cambia el período
  watch(periodoSeleccionado, async (nuevo) => {
    if (nuevo) {
      await fetchEstudiantesPorPeriodo(nuevo.Periodo_ID);
    } else {
      await fetchEstudiantes();
    }
  });
  
  // 📌 Limpiar filtros
  const limpiarFiltros = () => {
    periodoSeleccionado.value = null;
    busquedaNombre.value = '';
    busquedaCedula.value = '';
    filtroArea.value = 'Todos';
    estudiantesSeleccionados.value = [];
    areaSeleccionada.value = null;
    fetchEstudiantes();
  };
  
  // 📌 Mostrar confirmación
  const confirmarAsignacion = () => {
    dialogoVisible.value = true;
  };
  
  // 📌 Asignar área
  const asignarArea = async () => {
    dialogoVisible.value = false;
  
    try {
      for (const estudiante of estudiantesSeleccionados.value) {
        const payload = { Usuario_Area: areaSeleccionada.value };
  
        const res = await fetch(`${API}/usuarios/${estudiante.Usuario_Cedula}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
  
        if (!res.ok) throw new Error(`Error al actualizar área de ${estudiante.Usuario_Cedula}`);
      }
  
      toast.add({ severity: 'success', summary: 'Éxito', detail: 'Área asignada correctamente', life: 3000 });
  
      if (periodoSeleccionado.value) {
        await fetchEstudiantesPorPeriodo(periodoSeleccionado.value.Periodo_ID);
      } else {
        await fetchEstudiantes();
      }
  
      limpiarFiltros();
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 4000 });
    }
  };
  
  onMounted(() => {
    fetchPeriodos();
    fetchEstudiantes();
  });
  </script>
  