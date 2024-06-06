
//ayuda a los cors
using ApiRest.context;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificationOrigins = "Permisos";

var builder = WebApplication.CreateBuilder(args);

//Agregada ayuda a los cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificationOrigins,
                        policy =>
                        {

                            policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                        });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Base2Context>(opction =>
    opction.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"))
);

var app = builder.Build();
//con esto se crea la basede datos

using(var scope = app.Services.CreateScope())
{
    var context=scope.ServiceProvider.GetRequiredService<Base2Context>();
    context.Database.Migrate();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//Agregada ayuda a los cors
app.UseCors(MyAllowSpecificationOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
