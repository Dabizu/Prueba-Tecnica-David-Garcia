using ApiRest.context;
using ApiRest.model;
using Microsoft.AspNetCore.Mvc;

namespace ApiRest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RuletaController : Controller
    {
        private Base2Context contextB;
        public RuletaController(Base2Context contextb)
        {
            this.contextB = contextb;
        }

        [HttpGet("/numeroAleatorio")]
        public object getNumero()
        {
            Random random = new Random();
            int numero = random.Next(0, 36);
            int posicion;
            object[] obj=new object[2];
            string[] color = { "rojo", "negro" };
            if((numero % 2) == 0) {
                posicion = 1;
            }
            else
            {
                posicion = 0;
            }
            //return {numeroAleatorio:numero, color: color[posicion]};
            obj[0] = numero;
            obj[1] = color[posicion];
            return obj;
        }

        [HttpPost("/buscaMonto")]
        public IActionResult buscarMonto(string nombre)
        {
            var usuarios=contextB.Usuarios;
            var result = usuarios.Where(usuarios => usuarios.Nombre.Equals(nombre)).FirstOrDefault();
            try
            {
                return Ok(result);
            }
            catch(Exception ex)
            {
                return NoContent();
            }
            
            /*if(result != null) {
                return Ok(result);
            }else
            {
                Ok();
            }*/
        }

        [HttpPost("/registrar")]
        public IActionResult registrarUsuario([FromForm]Usuario usuario) 
        {
            var resultado = this.contextB.Usuarios.Add(usuario);
            this.contextB.SaveChanges();
            if (resultado != null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }
        [HttpPut("/modificacion")]
        public IActionResult modificarCantidad([FromForm]Usuario usuario)
        {
            var usuarios = contextB.Usuarios;
            var result = usuarios.Where(usuarios => usuarios.Nombre.Equals(usuario.Nombre)).FirstOrDefault();
            result.Dinero=usuario.Dinero;
            var resultado = this.contextB.Usuarios.Update(result);
            this.contextB.SaveChanges();
            if (resultado != null)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }
        /*
        public IActionResult Index()
        {
            return View();
        }*/
    }
}
