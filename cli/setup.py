import setuptools

with open("../README.md") as fp:
    long_description = fp.read()

setuptools.setup(
    name="slipbox",
    version="0.13.0",
    author="Levi Gruspe",
    author_email="mail.levig@gmail.com",
    description="Static-site generator for Zettelkasten notes",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/lggruspe/slipbox",
    packages=setuptools.find_packages(),
    package_data={
        "slipbox": ["data/frontend.js", "filters/*.lua", "*.sql"],
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Environment :: Console",
    ],
    python_requires=">=3.7",
)
