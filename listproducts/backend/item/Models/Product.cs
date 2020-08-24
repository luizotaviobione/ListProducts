using System.ComponentModel.DataAnnotations;

namespace item.Models {
    public class Product {
        [Key]

        public int Id { get; set; }

        [Required (ErrorMessage = "Este campo é obrigatório")]
        public string Nome { get; set; }

        public float Estoque { get; set; }

        public float Valor { get; set; }

        public string Url { get; set; }

    }
}