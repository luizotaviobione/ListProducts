using item.Models;
using Microsoft.EntityFrameworkCore;

namespace item.Data {
    public class DataContext : DbContext {

        public DataContext (DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<Product> Products { get; set; }

    }
}