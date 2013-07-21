using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Durandal2UserMaint.Models
{
    public partial class UserProfile
    {
        public UserProfile()
        {
            this.webpages_Roles = new List<webpages_Roles>();
        }

        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<webpages_Roles> webpages_Roles { get; set; }
    }
}
