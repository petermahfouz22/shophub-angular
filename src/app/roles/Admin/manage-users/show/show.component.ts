import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show',
  imports: [CommonModule],
  templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
  user?: User;
  isLoading = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser(id);
  }

  private loadUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (res) => {
        this.user = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onEdit(id: number) {
    // navigate to edit page
    // /admin/users/edit/:id
    // Adjust the path depending on your routing
    this.router.navigate(['/admin/users/edit', id]);
  }

  onDelete(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.router.navigate(['/admin/users']);
      },
      error: () => {
        alert('Failed to delete user');
      },
    });
  }
}
