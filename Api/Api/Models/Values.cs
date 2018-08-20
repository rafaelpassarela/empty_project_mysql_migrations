using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Values
    {
        [Key]
        [Required]
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }
    }
}