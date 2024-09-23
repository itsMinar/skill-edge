import Image from 'next/image';
import { ReactNode } from 'react';

import { Menu } from './_component/account-menu';

type AccountLayoutProps = {
  tabs: ReactNode;
};

export default function AccountLayout({ tabs }: AccountLayoutProps) {
  return (
    <section className="relative pb-16">
      {/*end container*/}
      <div className="container relative mt-10">
        <div className="lg:flex">
          <div className="md:px-3 lg:w-1/4">
            <div className="relative">
              <div className="rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
                <div className="profile-pic mb-5 text-center">
                  <input
                    id="pro-img"
                    name="profile-image"
                    type="file"
                    className="hidden"
                  />
                  <div>
                    <div className="relative mx-auto size-28">
                      <Image
                        src="/assets/images/profile.jpg"
                        className="rounded-full shadow ring-4 ring-slate-50 dark:shadow-gray-800 dark:ring-slate-800"
                        id="profile-banner"
                        alt="profile-image"
                        width={112}
                        height={112}
                      />
                      <label
                        className="absolute inset-0 cursor-pointer"
                        htmlFor="pro-img"
                      />
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold">Jenny Jimenez</h5>
                      <p className="text-slate-400">jennyhot@hotmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700">
                  <Menu />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[30px] md:px-3 lg:mt-0 lg:w-3/4">
            {tabs}
            {/* <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
							<h5 className="text-lg font-semibold mb-4">
								Personal Detail :
							</h5>
							<form>
								<div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
									<div>
										<Label className="mb-2 block">
											First Name :{" "}
											<span className="text-red-600">*</span>
										</Label>
										<Input
											type="text"
											placeholder="First Name:"
											id="firstname"
											name="name"
											required
										/>
									</div>
									<div>
										<Label className="mb-2 block">
											Last Name :{" "}
											<span className="text-red-600">*</span>
										</Label>
										<Input
											type="text"
											placeholder="Last Name:"
											name="name"
											required
										/>
									</div>
									<div>
										<Label className="mb-2 block">
											Your Email :{" "}
											<span className="text-red-600">*</span>
										</Label>
										<Input
											type="email"
											placeholder="Email"
											name="email"
											required
										/>
									</div>
									<div>
										<Label className="mb-2 block">Occupation :</Label>
										<Input
											name="name"
											id="occupation"
											type="text"
											placeholder="Occupation :"
										/>
									</div>
								</div>
								<div className="grid grid-cols-1">
									<div className="mt-5">
										<Label className="mb-2 block">
											Description :
										</Label>
										<Textarea
											id="comments"
											name="comments"
											placeholder="Message :"
										/>
									</div>
								</div>
								<Button className="mt-5" asChild>
									<input
										type="submit"
										name="send"
										value="Save Changes"
									/>
								</Button>
							</form>
						</div>
						<div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
							<div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
								<div>
									<h5 className="text-lg font-semibold mb-4">
										Contact Info :
									</h5>
									<form>
										<div className="grid grid-cols-1 gap-5">
											<div>
												<Label className="mb-2 block">
													Phone No. :
												</Label>
												<Input
													name="number"
													id="number"
													type="number"
													placeholder="Phone :"
												/>
											</div>
											<div>
												<Label className="mb-2 block">
													Website :
												</Label>
												<Input
													name="url"
													id="url"
													type="url"
													placeholder="Url :"
												/>
											</div>
										</div>
										<Button className="mt-5" type="submit">
											Add
										</Button>
									</form>
								</div>
								<div>
									<h5 className="text-lg font-semibold mb-4">
										Change password :
									</h5>
									<form>
										<div className="grid grid-cols-1 gap-5">
											<div>
												<Label className="mb-2 block">
													Old password :
												</Label>
												<Input
													type="password"
													placeholder="Old password"
													required=""
												/>
											</div>
											<div>
												<Label className="mb-2 block">
													New password :
												</Label>
												<Input
													type="password"
													placeholder="New password"
													required=""
												/>
											</div>
											<div>
												<Label className="mb-2 block">
													Re-type New password :
												</Label>
												<Input
													type="password"
													placeholder="Re-type New password"
													required=""
												/>
											</div>
										</div>
										<Button className="mt-5" type="submit">
											Save password
										</Button>
									</form>
								</div>
							</div>
						</div> */}
          </div>
        </div>
        {/*end grid*/}
      </div>
      {/*end container*/}
    </section>
  );
}
