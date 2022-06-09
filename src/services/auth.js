export default {
	auth(to, from, next) {
		const token = sessionStorage.getItem('token');
		if(!token){
			next('/login');
		}
		next();
	},

	rolA(to, from, next) {
		const rol = sessionStorage.getItem('ur');
		if(rol !== 1){
      this.$swal({
        position: 'top-end',
        icon: 'info',
        title: '¡Alto ahi! No posee los permisos suficientes para acceder a esta ruta',
        showConfirmButton: false,
        timer: 2500
      })
			this.$router.go(0);
		}
		next();
	},

	rolB(to, from, next) {
		const rol = sessionStorage.getItem('ur');
		if(rol !== 2 || rol !== 1){
			this.$swal({
        position: 'top-end',
        icon: 'info',
        title: '¡Alto ahi! No posee los permisos suficientes para acceder a esta ruta',
        showConfirmButton: false,
        timer: 2500
      })
			this.$router.go(0);
		}
		next();
	}
}
