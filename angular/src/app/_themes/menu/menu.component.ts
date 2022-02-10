import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Option } from "../option.model";
import { ThemeService } from "../theme.service";
import { AccountService } from '@app/_services'

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent {
  @Input() options: Array<Option>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  account = this.accountService.accountValue;

  constructor(private themeService: ThemeService, private accountService: AccountService
    ) {}

  changeTheme(themeToSet) {
    this.themeChange.emit(themeToSet);
    this.accountService.updateTheme(this.account.id, themeToSet).subscribe(result => { },
      err => {
        console.log(err);
      }
    )
  }
}
