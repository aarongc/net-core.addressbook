# net-core.addressbook
address book

How to publish in IIS:

1. Righ click project property and publish files in folder
2. Install dotnet core addon for IIS https://dotnet.microsoft.com/download/dotnet-core/thank-you/runtime-aspnetcore-5.0.0-windows-hosting-bundle-installer
3. Make sure to edit the application pool ".NET CLR Version" to "No Managed Code"
3. Run the application
