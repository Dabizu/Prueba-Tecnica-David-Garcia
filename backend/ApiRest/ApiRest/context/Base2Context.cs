using ApiRest.model;
using Microsoft.EntityFrameworkCore;

namespace ApiRest.context
{
    public class Base2Context : DbContext
    {
        public Base2Context(DbContextOptions<Base2Context> options):base(options){ }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
